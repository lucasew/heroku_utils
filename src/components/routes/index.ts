import Router from 'express-promise-router'

import {newExpressEventSource} from '../eventSources/express'
import {newTaskPool} from '../taskPool'

const router = Router({
    caseSensitive: false
})
const taskPool = newTaskPool(2)

router.use(require('./puppeteer').default)
router.use(require('./articleParser').default)
router.use(require('./error').default)

// setup express event source
const [handler, eventSource] = newExpressEventSource(async (data) => data, taskPool)
eventSource(console.log)

router.get("/teste", handler)



export default router