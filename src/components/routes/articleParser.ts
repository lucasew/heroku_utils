import Mercury from '@postlight/mercury-parser' 
import Router from 'express-promise-router'
import {actorize} from '../actor'
import {taskPool} from '../../config'

const router = Router()

type MercuryParserArticle = 'html' | 'markdown' | 'text' | undefined
const articleFuncGen = (format: MercuryParserArticle) => 
    actorize<string, Mercury.ParseResult>((url) => Mercury.parse(url, {
        contentType: format
    }), taskPool)

const articleHtml = articleFuncGen('html')
const articleMarkdown = articleFuncGen('markdown')
const articleText = articleFuncGen('text')

router.get('/mercury/json-html/:url', async (request, response) => {
    const {url} = request.params
    const content = await articleHtml(url)
    response.json(content)
})

router.get('/mercury/json-md/:url', async (request, response) => {
    const {url} = request.params
    const content = await articleMarkdown(url)
    response.json(content)
})

router.get('/mercury/json-txt/:url', async (request, response) => {
    const {url} = request.params
    const content = await articleText(url)
    response.json(content)
})

router.get('/mercury/html/:url', async (request, response) => {
    const {url} = request.params
    const content = await articleHtml(url)
    response.send(content.content)
})

router.get('/mercury/md/:url', async (request, response) => {
    const {url} = request.params
    const content = await articleMarkdown(url)
    response.send(content.content)
})

router.get('/mercury/txt/:url', async (request, response) => {
    const {url} = request.params
    const content = await articleText(url)
    response.send(content.content)
})

export default router