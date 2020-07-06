import { sendMeATelegram } from "./components/telegram"
import { newTaskPool } from "./utils/newTaskPool"
import { newEnderHandler } from "./utils/newEnderHandler"
import config from "./config"

export const logger = (msg: string) => {
    console.log(msg)
    return sendMeATelegram(msg)
}

export const taskPool = newTaskPool(config.concurrentTasks)
export const addEndHandler = newEnderHandler()