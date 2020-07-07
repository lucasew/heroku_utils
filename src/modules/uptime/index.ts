import {Router} from 'express'
import { TelegrafContext } from 'telegraf/typings/context'
import Telegraf from 'telegraf'
import {uptime} from '../../components/uptime'

export default {
    async http(router: Router) {
        router.use((request, response) => {
            return response.json({
                data: uptime
            })
        })
    },
    async telegram(bot: Telegraf<TelegrafContext>) {
        bot.command('uptime', (ctx) => {
            ctx.reply(String(uptime))
        })
    }
}