import puppeteer from 'puppeteer'

import {newTimeout} from '../../utils/timeout'
import {logger} from '../../common'
import {Router} from 'express'
import {handle as browser} from '../../components/browser'

export default async (router: Router) => {
    router.get("/:url/:awaitSelector", async (request, response) => {
        const {url, awaitSelector} = request.params
        const iPhone = puppeteer.devices['iPhone 6'];
        logger(`puppeteer: ${url}`)
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
}