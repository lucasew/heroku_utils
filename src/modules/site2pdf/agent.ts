import {handle as browser} from '../../components/browser'
import {logger} from '../../common'

export async function url2pdf(url: string, awaitSelector?: string) {
    return browser(async (page) => {
        logger(`url2pdf ${url}`)
        await page
            .goto(url)
        if (awaitSelector) {
            await page
                .waitForSelector(awaitSelector)
        }
        return await page.pdf()
    })
}

export async function html2pdf(html: string) {
    return browser(async (page) => {
        await page.setContent(html)
        return await page.pdf()
    })
}