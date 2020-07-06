import Telegraf from 'telegraf'
import config from '../config'

export default {
    setup,
    launch,
    destroy
}

export const bot = new Telegraf(config.telegram.token)


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
    await bot.launch({
        polling: {
            limit: 10
        }
    })
}

async function destroy() {
    bot.stop()
}
