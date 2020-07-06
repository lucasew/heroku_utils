import puppeteer from 'puppeteer'
import { newTaskPool } from '../utils/newTaskPool'
import getenv from 'getenv'

export default {setup, launch, destroy}

const concurrentPuppeteerJobs = getenv.int('CONCURRENT_PUPPETEER_JOBS', 2)
const puppeteerTaskPool = newTaskPool(concurrentPuppeteerJobs)

const browser = puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
})

async function setup() {
}
async function launch() {
    await browser
}
async function destroy() {
    const b = await browser
    await b.close()
}

export function handle<T>(handler: (page: puppeteer.Page) => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
        puppeteerTaskPool(async () => {
            try {
                const b = await browser
                const page = await b.newPage()
                resolve(await Promise.resolve(handler(page)))
                await page.close()
            } catch (e) {
                reject(e)
            }
        })
    })
}