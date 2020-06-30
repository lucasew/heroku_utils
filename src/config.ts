import dotenv from 'dotenv'
import getenv from 'getenv'
import {Telegraf, Telegram} from 'telegraf'
import Router from 'express-promise-router'

import {newTaskPool} from './utils/newTaskPool'
import { newUptime } from './utils/newUptime'
dotenv.config()

export const HTTP_PORT = getenv.int("PORT", 3000)
export const taskPool = newTaskPool(10)

export const telegram_adm = getenv.string('TELEGRAM_LOG_CHAT', '') 
export const telegram_token = getenv.string('TELEGRAM_LOG_BOT', '')

export const bot = new Telegraf(telegram_token)
export const botAPI = new Telegram(telegram_token)

bot.use(async (ctx, next) => {
    const cond = ctx.from?.id === parseInt(telegram_adm)
    if (cond)  {
        return await next()
    }
    await botAPI.sendMessage(telegram_adm ,`@${ctx.message?.from?.username}: ${ctx.updateType}
    ${JSON.stringify(ctx.update, null, 2)}`)
})

export const logger = async (msg: string) => {
    await botAPI.sendMessage(telegram_adm, msg)
    console.log(msg)
}

export const uptime = newUptime()

export const router = Router()