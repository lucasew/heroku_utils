import moduleContext from '../moduleContext'
import telegram from './telegram'

export default (ctx: moduleContext) => {
    ctx.registerBotHandlers(telegram)
}