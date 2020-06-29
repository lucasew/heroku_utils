import Router from 'express-promise-router'
import puppeteer from 'puppeteer'

import {newPuppeteerAgent} from '../agents/puppeteer'
import {newTimeout} from '../timeout'
import {logger} from '../../config'

const router = Router()
const browserAgent = newPuppeteerAgent(1)

router.get("/render/:url/:awaitSelector", async (request, response) => {
    const {url, awaitSelector} = request.params
    const iPhone = puppeteer.devices['iPhone 6'];
    logger(`puppeteer: ${url}`)
    const browser = await browserAgent
    await browser(async (page) => {
        try {
            await newTimeout(async () => {
                await page.emulate(iPhone)
                await page.goto(url, {
                    waitUntil: 'load'
                })
                await page.waitForSelector(awaitSelector)
                const html = await page.content()
                response
                    .send(html)
            }, 30000)
        } catch (e) {
            throw e
        }
    })
})

export default router