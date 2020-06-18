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
    console.log(`puppeteer: ${request.params.page}`)
    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    setTimeout(() => {
        page.close().then(browser.close)
        throw {
            message: "timeout",
            status: 500
        }
    }, 30000)
    let page = await browser.newPage()
    let frame = await page.goto(request.params.page, {
        waitUntil: 'networkidle0'
    })
    if (frame === undefined || frame === null) {
        throw {
            message: "frame is undefined",
            status: 500
        }
    }
    const contentType = response.getHeader('Content-Type')
    if (contentType !== undefined) {
        response.setHeader('Content-Type', contentType)
    }
    response
        .status(frame.status() as number).send(await frame.buffer())
})

export default router