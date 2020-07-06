import {Router} from 'express'
import {uptime} from '../../components/uptime'

export default async (router: Router) => {
    router.use((request, response) => {
        return response.json({
            data: uptime
        })
    })
}