import http from './http'
import moduleContext from '../moduleContext'

export default async (ctx: moduleContext) => {
    return await ctx.registerRoutes(http)
}