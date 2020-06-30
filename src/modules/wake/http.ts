import { Router } from "express";

export default async (router: Router) => {
    router.use('/wake', (request, response) => {
        return response.json({
            data: 'woken'
        })
    })
}