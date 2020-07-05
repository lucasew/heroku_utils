import { Router } from "express";

export default (router: Router) => {
    router.use((request, response) => {
        return response.json({
            data: 'woken'
        })
    })
}