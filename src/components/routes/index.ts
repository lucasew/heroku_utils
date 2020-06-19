import Router from 'express-promise-router'

import {newExpressEventSource} from '../eventSources/express'
import {taskPool} from '../../config'

const router = Router({
    caseSensitive: false
})

router.use(require('./puppeteer').default)
router.use(require('./articleParser').default)
router.use(require('./error').default)

// setup express event source
const [handler, eventSource] = newExpressEventSource(async (data) => data, taskPool)
eventSource(console.log)

router.get("/teste", handler)



export default router