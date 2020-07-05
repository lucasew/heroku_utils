import http from './http'
import telegram from './telegram'
import moduleContext from '../moduleContext'

export default (ctx: moduleContext) => {
    ctx.registerBotHandlers(telegram)
    ctx.registerRoutes(http)
}