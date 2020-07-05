import http from './http'
import moduleContext from '../moduleContext'

export default (ctx: moduleContext) => {
    ctx.registerRoutes(http)
}