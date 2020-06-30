import {Router} from 'express'
import {articleHtml, articleMarkdown, articleText} from './agent'

export default async (router: Router) => {
    router.get('/json-html/:url', async (request, response) => {
        const {url} = request.params
        const content = await articleHtml(url)
        response.json(content)
    })

    router.get('/json-md/:url', async (request, response) => {
        const {url} = request.params
        const content = await articleMarkdown(url)
        response.json(content)
    })

    router.get('/json-txt/:url', async (request, response) => {
        const {url} = request.params
        const content = await articleText(url)
        response.json(content)
    })

    router.get('/html/:url', async (request, response) => {
        const {url} = request.params
        const content = await articleHtml(url)
        response.send(content.content)
    })

    router.get('/md/:url', async (request, response) => {
        const {url} = request.params
        const content = await articleMarkdown(url)
        response.send(content.content)
    })

    router.get('/txt/:url', async (request, response) => {
        const {url} = request.params
        const content = await articleText(url)
        response.send(content.content)
    })
}
