import {inspect} from 'util'
import {parseTelegramCommand} from '../../utils/parseTelegramCommand'
import { TelegrafContext } from 'telegraf/typings/context'
import Telegraf from 'telegraf'

export default async (bot: Telegraf<TelegrafContext>) => {
    bot.command('inspect', (ctx) => {
        const inspected = inspect(ctx.update, true, 10)
        const cmd = parseTelegramCommand(ctx)
        ctx.reply(inspect(cmd))
        ctx.reply(inspected).catch((err) => {
            ctx.reply(`erro: ${err}`)
        })
    })
}