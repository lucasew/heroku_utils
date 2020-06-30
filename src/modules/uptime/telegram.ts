import {bot} from '../../config'
import uptime from './agent'

export default async () => {
    bot.command('uptime', (ctx) => {
        ctx.reply(String(uptime()))
    })
}