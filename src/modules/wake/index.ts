import { Router } from "express";

export default {
    http(router: Router) {
        router.use((request, response) => {
            return response.json({
                data: 'woken'
            })
        })
    }
}