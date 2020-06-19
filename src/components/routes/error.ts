import Router from 'express-promise-router'

const router = Router()

router.get("/error/:statusStr/:message", async (request, response) => {
    const {statusStr, message} = request.params
    const status = parseInt(statusStr)
    if (isNaN(status)) {
        throw {
            status: 500,
            message: 'status is not a number'
        }
    }
    throw {status, message}
})

export default router