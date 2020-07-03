import dotenv from 'dotenv'
import getenv from 'getenv'
import {Telegraf, Telegram} from 'telegraf'
import Router from 'express-promise-router'

import {newTaskPool} from './utils/newTaskPool'
import { newUptime } from './utils/newUptime'
import {newEnderHandler} from './utils/newEnderHandler'
import {newPuppeteerAgent} from './modules/puppeteer/agent'
dotenv.config()

export const [addEndHandler, endApp] = newEnderHandler()

export const HTTP_PORT = getenv.int("PORT", 3000)
export const taskPool = newTaskPool(10)

export const telegram_adm = getenv.string('TELEGRAM_LOG_CHAT', '') 
export const telegram_token = getenv.string('TELEGRAM_LOG_BOT', '')

export const bot = new Telegraf(telegram_token)

export const sendMeATelegram = async (msg: string) => 
    await bot.telegram.sendMessage(telegram_adm, msg)

addEndHandler(() => sendMeATelegram('teste'))

bot.use(async (ctx, next) => {
    const cond = ctx.from?.id === parseInt(telegram_adm)
    if (cond)  {
        return await next()
    }
    await sendMeATelegram(`@${ctx.message?.from?.username}: ${ctx.updateType}
    ${JSON.stringify(ctx.update, null, 2)}`)
})


export const logger = async (msg: string) => {
    await sendMeATelegram(msg)
    console.log(msg)
}

export const uptime = newUptime()

export const browser = newPuppeteerAgent(1)

export const router = Router()
