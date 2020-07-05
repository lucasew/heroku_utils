import uptime from './agent'
import { TelegrafContext } from 'telegraf/typings/context'
import Telegraf from 'telegraf'

export default (bot: Telegraf<TelegrafContext>)=> {
    bot.command('uptime', (ctx) => {
        ctx.reply(String(uptime()))
    })
}