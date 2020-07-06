import { sendMeATelegram } from "./components/telegram"
import { newTaskPool } from "./utils/newTaskPool"
import { newEnderHandler } from "./utils/newEnderHandler"
import getenv from 'getenv'

export const logger = (msg: string) => {
    console.log(msg)
    return sendMeATelegram(msg)
}

export const concurrentTasks = getenv.int("CONCURRENT_TASKS", 10)
export const taskPool = newTaskPool(concurrentTasks)
export const addEndHandler = newEnderHandler()