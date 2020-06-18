import Parser from 'rss-parser'
import axios from 'axios'

import {assertHave} from '../../utils/assertHave'
import {TaskRunner} from '../../model/taskRunner'
import {EventHandler, Source} from '../../model/source'
import {RSSEvent, RSSFeedMetadata, RSSItemMetadata} from '../../model/event/rss'
import {actorize} from '../../components/actor'
import RSSParser from 'rss-parser'
import {newBroadcaster} from '../../utils/eventBroadcast'

export function newRSSEventSource(
    feedUrl: string, 
    taskRunner: TaskRunner, 
): [Source<RSSEvent>, EventHandler<any>] {
    const parser = new RSSParser()
    const getFeed = actorize(
        (url: string) => parser.parseURL(url),
        taskRunner
    )
    let rssFeedMetadata: RSSFeedMetadata | undefined = undefined
    let lastItem = ''
    const [addListener, broadcast] = newBroadcaster<RSSEvent>()
    const fetchMetadata = async () => {
        const parsed = await getFeed(feedUrl)
        if (rssFeedMetadata === undefined) {
            rssFeedMetadata = {
                title: assertHave(parsed.title),
                feedURL: new URL(feedUrl),
                description: parsed.description,
                image: parsed.image,
                link: parsed.link
            }
        }
        let items: RSSItemMetadata[] = assertHave(parsed.items).map((item) => {
            return {
                title: assertHave(item.title),
                categories: item.categories ? item.categories : [],
                content: item.content,
                contentSnippet: item.contentSnippet,
                creator: item.creator,
                guid: item.guid,
                link: item.link,
                pubDate: item.pubDate ? new Date(item.pubDate) : undefined
            }
        })
        let foundTheLast = false
        items
            .filter((item) => {
                if (item.link === lastItem) {
                    foundTheLast = true
                }
                return !foundTheLast
            })
            .reverse()
            .forEach((item) => {
                broadcast({
                    feed: assertHave(rssFeedMetadata),
                    item
                })
            })
        lastItem = assertHave(items[0].link)
    }
    return [addListener, () => fetchMetadata()]
}