import Telegraf, { Telegram } from 'telegraf'
import config from '../config'
import { TelegrafContext } from 'telegraf/typings/context'

export default {
    setup,
    launch,
    destroy
}

export type PluginType = (bot: Telegraf<TelegrafContext>) => Promise<void>

export const bot = new Telegraf(config.telegram.token)
let plugins: PluginType[] = []

export const externalUse = (fn: (bot: Telegraf<TelegrafContext>) => any) => {
    plugins.push(fn)
}

export const sendMeATelegram = (msg: string) =>
    bot.telegram.sendMessage(config.telegram.adm, msg)

async function setup() {
    bot.use(async (ctx, next) => {
        const cond = ctx.from?.id === parseInt(config.telegram.adm)
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
