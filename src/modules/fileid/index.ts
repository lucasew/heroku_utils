import {parseTelegramCommand} from '../../utils/parseTelegramCommand'
import { TelegrafContext } from 'telegraf/typings/context'
import Telegraf from 'telegraf'

export default {
    async telegram(bot: Telegraf<TelegrafContext>) {
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
            return ctx.replyWithDocument(fileid)
        }))
        bot.command('audio_fileid', createMiddlewareFromFileIDHandler((ctx, fileid) => {
            return ctx.replyWithAudio(fileid)
        }))
        bot.command('video_fileid', createMiddlewareFromFileIDHandler((ctx, fileid) => {
            return ctx.replyWithVideo(fileid)
        }))
        bot.command('image_fileid', createMiddlewareFromFileIDHandler((ctx, fileid) => {
            return ctx.replyWithPhoto(fileid)
        }))
    }
}