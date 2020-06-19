import Mercury from '@postlight/mercury-parser' 
import Router from 'express-promise-router'

const router = Router()

router.get('/mercury/json-html/:url', async (request, response) => {
    const {url} = request.params
    const content = await Mercury.parse(url) 
    response.json(content)
})

router.get('/mercury/json-md/:url', async (request, response) => {
    const {url} = request.params
    const content = await Mercury.parse(url, {
        contentType: "markdown"
    }) 
    response.json(content)
})

router.get('/mercury/json-txt/:url', async (request, response) => {
    const {url} = request.params
    const content = await Mercury.parse(url, {
        contentType: 'text'
    }) 
    response.json(content)
})

router.get('/mercury/html/:url', async (request, response) => {
    const {url} = request.params
    const content = await Mercury.parse(url) 
    response.send(content.content)
})

router.get('/mercury/md/:url', async (request, response) => {
    const {url} = request.params
    const content = await Mercury.parse(url, {
        contentType: "markdown"
    }) 
    response.send(content.content)
})

router.get('/mercury/txt/:url', async (request, response) => {
    const {url} = request.params
    const content = await Mercury.parse(url, {
        contentType: 'text'
    }) 
    response.send(content.content)
})

export default router