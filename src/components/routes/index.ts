import Router from 'express-promise-router'

import {newExpressEventSource} from '../eventSources/express'
import {newTaskPool} from '../taskPool'

const router = Router({
    caseSensitive: false
})
const taskPool = newTaskPool(2)

router.use(require('./puppeteer').default)
router.use(require('./articleParser').default)

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


export default router