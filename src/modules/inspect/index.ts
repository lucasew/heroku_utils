import { Router } from "express"
import { inspect } from 'util'
import Telegraf from "telegraf"
import { TelegrafContext } from "telegraf/typings/context"
import { parseTelegramCommand } from "../../utils/parseTelegramCommand"

export default {
    async http(router: Router) {
        router.use((request, response) => {
            response.send(inspect(request))
        })
    },
    async telegram(bot: Telegraf<TelegrafContext>) {
        bot.command('inspect', (ctx) => {
            const inspected = inspect(ctx.update, true, 10)
            const cmd = parseTelegramCommand(ctx)
            ctx.reply(inspect(cmd))
            ctx.reply(inspected).catch((err) => {
                ctx.reply(`erro: ${err}`)
            })
        })
    }
}