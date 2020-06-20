import Router from 'express-promise-router'

const router = Router()

router.use('/wake', (request, response) => {
    return response.json({
        data: 'woken'
    })
})

export default router