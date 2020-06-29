import dotenv from 'dotenv'
import getenv from 'getenv'

import {newTaskPool} from './components/taskPool'
import {newLogger} from './components/telegram_log'
dotenv.config()

export const HTTP_PORT = getenv.int("PORT", 3000)
export const taskPool = newTaskPool(10)

export const logger = newLogger(taskPool, {
    chat: getenv.string('TELEGRAM_LOG_CHAT', ''),
    token: getenv.string('TELEGRAM_LOG_BOT', '')
})

export default {
    HTTP_PORT,
    taskPool,
    logger
}