import {getFirestore} from '../../components/firebase'
import Telegraf from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'
import { sendMeATelegram } from '../../components/telegram'

export default {
    async telegram(bot: Telegraf<TelegrafContext>) {
        const store = await getFirestore('telegramLog')
        bot.use((ctx, next) => {
            store.push(ctx.update, (ret) => {
                if (ret) {
                    sendMeATelegram(ret.message)
                }
                next()
            })
        })
    }
}