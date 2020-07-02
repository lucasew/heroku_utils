import {Router} from 'express'
import {articleHtml} from '../articleParser/agent'
import FeedParser from 'rss-parser'
import {Feed} from 'feed'
import or from '../../utils/or'

export default async (router: Router) => {
    const feedParser = new FeedParser()
    router.get('/:feed/', async (request, response) => {
        let parsedFeed = await feedParser.parseURL(request.params.feed)
        let feed = new Feed({
            title: or(parsedFeed.title, 'processed feed'),
            id: '',
            copyright: '',
            description: parsedFeed.description,
            favicon: or(parsedFeed.image?.url, ''),
            feed: parsedFeed.feedUrl,
            image: parsedFeed.image?.url,
        })
        await Promise.all(
            or(parsedFeed.items, []).map(async (item) => {
                if (item.link === undefined) {
                    return
                }
                const article = await articleHtml(item.link)
                feed.addItem({
                    date: new Date(or(article.date_published, '')),
                    link: article.url,
                    title: or(article.title, ''),
                    content: or(article.content, ''),
                    author: [{
                        name: or(or(item.creator, article.author), '')
                    }]
                })
                return
            })
        )
        response
            .contentType('application/rss+xml')
            .send(feed.rss2())
    })
}