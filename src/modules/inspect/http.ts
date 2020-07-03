import {Router} from 'express'
import {inspect} from 'util'

export default async (router: Router) => {
    router.get('/', (request, response) => {
        response.send(inspect(request))
    })
}