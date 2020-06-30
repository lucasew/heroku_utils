import {Router} from 'express'
import uptime from './agent'

export default async (router: Router) => {
    router.use('/uptime', (request, response) => {
        return response.json({
            data: uptime()
        })
    })
}