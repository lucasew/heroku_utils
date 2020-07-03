import {bot} from '../../config'
import {inspect} from 'util'
import {parseTelegramCommand} from '../../utils/parseTelegramCommand'

export default async () => {
    bot.command('inspect', (ctx) => {
        const inspected = inspect(ctx.update, true, 10)
        const cmd = parseTelegramCommand(ctx)
        ctx.reply(inspect(cmd))
        ctx.reply(inspected).catch((err) => {
            ctx.reply(`erro: ${err}`)
        })
    })
}