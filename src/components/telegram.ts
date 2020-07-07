import Telegraf, { Telegram } from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'
import getenv from 'getenv'

export type PluginType = (bot: Telegraf<TelegrafContext>) => Promise<void>

const auth = {
    adm: getenv.string('TELEGRAM_LOG_CHAT'),
    token: getenv.string('TELEGRAM_LOG_BOT')
}

const app = new Telegraf(auth.token)

let plugins: PluginType[] = []

export function handle<T>(handler: (ctx: Telegraf<TelegrafContext>) => T) {
    return Promise.resolve(handler(app))
}

export const registerPlugin = (fn: (bot: Telegraf<TelegrafContext>) => any) => {
    plugins.push(fn)
}

export const sendMeATelegram = (msg: string) =>
    app.telegram.sendMessage(auth.adm, msg)

export default {
    async setup() {
        app.use(async (ctx, next) => {
            const cond = ctx.from?.id === parseInt(auth.adm)
            if (cond) {
                return await next()
            }
            await sendMeATelegram(`@${ctx.message?.from?.username}: ${ctx.updateType}
            ${JSON.stringify(ctx.update, null, 2)}`)
        })
    },
    async launch() {
        await Promise.all(plugins.map(handle))
        app.use(async (ctx, next) => {
            await ctx.reply('command not found :(')
            await next()
        })
        await app.launch({
            polling: {
                limit: 10
            }
        })
    },
    async destroy() {
        app.stop()
    }
}
