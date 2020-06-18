import Router from 'express-promise-router'
import puppeteer from 'puppeteer'

import {newExpressEventSource} from './components/eventSources/express'
import {newTaskPool} from './components/taskPool'

const router = Router()
const taskPool = newTaskPool(2)


// setup express event source
const [handler, eventSource] = newExpressEventSource(async (data) => data, taskPool)
eventSource(console.log)

router.get("/teste", handler)

router.get("/render/:page", async (request, response) => {
    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    let page = await browser.newPage()
    let frame = await page.goto(request.params.page, {
        waitUntil: "networkidle2"
    })
    response.status(frame?.status() as number).send(frame?.buffer)
    await Promise.all([page.close(), browser.close()])
})

export default router