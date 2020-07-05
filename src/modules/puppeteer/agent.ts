import puppeteer from 'puppeteer'
import {newTaskPool} from '../../utils/newTaskPool'
import {addEndHandler} from '../../config'

export async function newPuppeteerAgent(concurrentPages: number) {
    const puppeteerTaskPool = newTaskPool(concurrentPages)
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    addEndHandler(() => browser.close())
    return (handler: (page: puppeteer.Page) => Promise<void>) => {
        return new Promise((resolve, reject) => {
            puppeteerTaskPool(() => {
                async function handle() {
                    const page = await browser.newPage()
                    await handler(page)
                    page.close()
                }
                handle()
                    .then(resolve)
                    .catch(reject)
            })
        })
    }
}