import { Router } from "express"

export default {
    async http(router: Router) {
        router.get("/:statusStr/:message", async (request, response) => {
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
    }
}