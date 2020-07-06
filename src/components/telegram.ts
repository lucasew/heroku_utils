import Telegraf, { Telegram } from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'
import getenv from 'getenv'

export default {
    setup,
    launch,
    destroy
}

const auth = {
    adm: getenv.string('TELEGRAM_LOG_CHAT'),
    token: getenv.string('TELEGRAM_LOG_BOT')
}

export type PluginType = (bot: Telegraf<TelegrafContext>) => Promise<void>

export const bot = new Telegraf(auth.token)
let plugins: PluginType[] = []

export const externalUse = (fn: (bot: Telegraf<TelegrafContext>) => any) => {
    plugins.push(fn)
}

export const sendMeATelegram = (msg: string) =>
    bot.telegram.sendMessage(auth.adm, msg)

async function setup() {
    bot.use(async (ctx, next) => {
        const cond = ctx.from?.id === parseInt(auth.adm)
        if (cond) {
            return await next()
        }
        await sendMeATelegram(`@${ctx.message?.from?.username}: ${ctx.updateType}
        ${JSON.stringify(ctx.update, null, 2)}`)
    })
}

async function launch() {
    await Promise.all(plugins.map((plugin) => plugin(bot))) 
    await bot.launch({
        polling: {
            limit: 10
        }
    })
}

async function destroy() {
    bot.stop()
}
