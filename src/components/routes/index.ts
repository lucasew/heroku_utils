import Router from 'express-promise-router'
import puppeteer from 'puppeteer'

import {newExpressEventSource} from '../eventSources/express'
import {newTaskPool} from '../taskPool'
import {newPuppeteerAgent} from '../agents/puppeteer'

const router = Router({
    caseSensitive: false
})
const taskPool = newTaskPool(2)

const browserAgent = newPuppeteerAgent(1)
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
    const iPhone = puppeteer.devices['iPhone 6'];
    console.log(`puppeteer: ${request.params.page}`)
    const browser = await browserAgent
    await browser(async (page) => {
        const timeout = setTimeout(() => {
            throw {
                message: 'timeout',
                status: 500
            }
        }, 30000)
        await page.emulate(iPhone)
        let frame = await page.goto(request.params.page, {
            waitUntil: 'load'
        })
        if (frame === undefined || frame === null) {
            clearTimeout(timeout)
            throw {
                message: 'frame is undefined',
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
})

export default router