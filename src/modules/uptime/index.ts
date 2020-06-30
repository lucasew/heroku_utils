import http from './http'
import telegram from './telegram'
import moduleContext from '../moduleContext'

export default async (ctx: moduleContext) => {
    await telegram()
    return await ctx.registerRoutes(http)
}