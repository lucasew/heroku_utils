import Router from 'express-promise-router'
import puppeteer from 'puppeteer'

import {newExpressEventSource} from './components/eventSources/express'
import {newTaskPool} from './components/taskPool'

const router = Router({
    caseSensitive: false
})
const taskPool = newTaskPool(2)


// setup express event source
const [handler, eventSource] = newExpressEventSource(async (data) => data, taskPool)
eventSource(console.log)

router.get("/teste", handler)

router.get("/error", async (request, response) => {
    throw {
        status: 404,
        message: "no problem, this is a error"
    }
})

router.get("/render/:page", async (request, response) => {
    console.log(`puppeteer: ${request.params.page}`)
    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    const timeout = setTimeout(() => {
        page.close().then(browser.close)
        throw {
            message: "timeout",
            status: 500
        }
    }, 30000)
    let page = await browser.newPage()
    let frame = await page.goto(request.params.page, {
        waitUntil: 'domcontentloaded'
    })
    if (frame === undefined || frame === null) {
        clearTimeout(timeout)
        throw {
            message: "frame is undefined",
            status: 500
        }
    }
    const contentType = response.getHeader('Content-Type')
    if (contentType !== undefined) {
        response.setHeader('Content-Type', contentType)
    }
    const html = await page.content()
    response
        .status(frame.status() as number).send(html)
    clearTimeout(timeout)
})

export default router