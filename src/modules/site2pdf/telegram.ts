import {html2pdf, url2pdf} from './agent'
import {parseTelegramCommand} from '../../utils/parseTelegramCommand'
import Telegraf from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'

export default async (bot: Telegraf<TelegrafContext>) => {
    bot.command('html2pdf', (ctx) => {
        const cmd = parseTelegramCommand(ctx)
        if (cmd === undefined) {
            return ctx.reply('empty html to render')
        }
        const html = cmd.args
        html2pdf(html)
            .then((buf) => {
                ctx.replyWithDocument({
                    source: buf,
                    filename: 'html2pdf.pdf'
                })
            }).catch((err) => {
                ctx.reply(`erro: ${JSON.stringify(err, null, 2)}`)
            })
    })

    bot.command('url2pdf', (ctx) => {
        const cmd = parseTelegramCommand(ctx)
        if (cmd === undefined) {
            return ctx.reply('empty url to render')
        }
        const url = cmd.args
        url2pdf(url)
            .then((buf) => {
                ctx.replyWithDocument({
                    source: buf,
                    filename: `url2pdf.pdf`
                })
            })
            .catch((err) => {
                ctx.reply(`erro: ${JSON.stringify(err, null, 2)}`)
            })
    })
}