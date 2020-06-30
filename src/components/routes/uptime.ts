import Router from 'express-promise-router'
import {uptime} from '../../config'

const router = Router()

router.use('/uptime', (request, response) => {
    return response.json({
        data: uptime()
    })
})

export default router