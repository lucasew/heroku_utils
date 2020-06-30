import { Router } from "express";

export default async (router: Router) => {
    router.use((request, response) => {
        return response.json({
            data: 'woken'
        })
    })
}