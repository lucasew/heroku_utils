import {bot} from '../../config'
import {parseTelegramCommand} from '../../utils/parseTelegramCommand'
import { TelegrafContext } from 'telegraf/typings/context'

export default async () => {
    function createMiddlewareFromFileIDHandler(fn: (ctx: TelegrafContext, file_id: string) => Promise<any>) {
        return async function (ctx: TelegrafContext) {
            const cmd  = parseTelegramCommand(ctx)
            if (cmd === undefined) {
                return await ctx.reply('failed to parse command')
            }
            await fn(ctx, cmd.args)
                .catch((err) => ctx.reply(`error: ${err}`))

        }
    }
    bot.command('doc_fileid', createMiddlewareFromFileIDHandler((ctx, fileid) => {
        return ctx.replyWithDocument({
            source: fileid
        })
    }))
    bot.command('audio_fileid', createMiddlewareFromFileIDHandler((ctx, fileid) => {
        return ctx.replyWithAudio({
            source: fileid
        })
    }))
    bot.command('video_fileid', createMiddlewareFromFileIDHandler((ctx, fileid) => {
        return ctx.replyWithVideo({
            source: fileid
        })
    }))
    bot.command('image_fileid', createMiddlewareFromFileIDHandler((ctx, fileid) => {
        return ctx.replyWithPhoto({
            source: fileid
        })
    }))
}