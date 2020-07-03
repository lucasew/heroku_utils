import {browser as browserAgent} from '../../config'
import {logger} from '../../config'

export async function url2pdf(url: string, awaitSelector?: string) {
    const browser = await browserAgent
    return await new Promise<Buffer>((resolve, reject) => {
        browser(async (page) => {
            logger(`url2pdf ${url}`)
            await page
                .goto(url)
                .catch(reject)
            if (awaitSelector) {
                await page
                    .waitForSelector(awaitSelector)
                    .catch(reject)
            }
            await page.pdf()
                .then(resolve)
                .catch(reject)
        })
    })
}

export async function html2pdf(html: string) {
    const browser = await browserAgent
    return await new Promise<Buffer>((resolve, reject) => {
        browser(async (page) => {
            await page.setContent(html).catch(reject)
            await page.pdf()
                .then(resolve)
                .catch(reject)
        })
    })
}