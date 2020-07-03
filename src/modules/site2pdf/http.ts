import {Router, response} from 'express'
import {html2pdf, url2pdf} from './agent'

export default async (router: Router) => {
    router.get('/html', async (request, response) => {
        const body = String(request.body)
        response
            .contentType('application/pdf')
            .send(await html2pdf(body))
    })
    router.get('/site/:url', async (request, response) => {
        response
            .contentType('application/pdf')
            .send(await url2pdf(request.params.url))
    })
}