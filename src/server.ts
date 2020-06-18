import express from 'express'
import morgan from 'morgan'
import {newExpressEventSource} from './components/eventSources/express'
import {newRSSEventSource} from './components/eventSources/rss'
import {newTaskPool} from './components/taskPool'
import {newTimer} from './components/eventSources/timer'
import config from './config'
import puppeteer from 'puppeteer'
import Router from 'express-promise-router'

let app = express()
app.use(morgan('tiny'))

let router = Router()

const taskPool = newTaskPool(2)
const timer = newTimer(10000)

// setup express event source
const [handler, eventSource] = newExpressEventSource(async (data) => data, taskPool)
eventSource(console.log)
router.get("/teste", handler)
router.get("/render/:page", async (request, response) => {
    let browser = await puppeteer.launch({
        headless: true
    })
    let page = await browser.newPage()
    let frame = await page.goto(request.params.page, {
        waitUntil: "networkidle2"
    })
    response.status(frame?.status() as number).send(frame?.buffer)
    await Promise.all([page.close(), browser.close()])
})

// try {
//     let [subs, tick] = newRSSEventSource("https://www.aquiagora.net/rss", taskPool)
//     timer(tick)
//     subs(console.log)
// } catch(e) {
//     console.error(e)
// }

timer(console.log)

app.use(router)
app.listen(config.HTTP_PORT)