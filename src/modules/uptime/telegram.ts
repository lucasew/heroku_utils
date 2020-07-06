import { TelegrafContext } from 'telegraf/typings/context'
import Telegraf from 'telegraf'
import {uptime} from '../../components/uptime'

export default (bot: Telegraf<TelegrafContext>)=> {
    bot.command('uptime', (ctx) => {
        ctx.reply(String(uptime))
    })
}