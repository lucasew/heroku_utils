import {Telegraf} from 'telegraf/typings/telegraf'
import {TelegrafContext} from 'telegraf/typings/context'

const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

export function parseTelegramCommand(ctx: TelegrafContext) {
    if (ctx.message === undefined) {
        return undefined
    }
    const message = ctx.message.text
    if (message === undefined) {
        return undefined
    }
    const parts = regex.exec(message.trim())
    if (parts === null) {
        return undefined
    }
    let command = parts[1]
    let bot = parts[2]
    let args = parts[3]
    return {
        message,
        command,
        bot,
        args,
        get splitArgs() {
            return !args ? [] : args.split(/\s+/).filter(arg => arg.length);
        },
    }
}