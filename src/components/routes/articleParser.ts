import Mercury from '@postlight/mercury-parser' 
import Router from 'express-promise-router'

const router = Router()
router.get('/mercury/:url', async (request, response) => {
    const {url} = request.params
    response.json(await Mercury.parse(url))
})

export default router