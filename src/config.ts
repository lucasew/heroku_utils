import dotenv from 'dotenv'
import getenv from 'getenv'

import {newTaskPool} from './components/taskPool'
dotenv.config()

export const HTTP_PORT = getenv.int("PORT", 3000)
export const taskPool = newTaskPool(10)

export default {
    HTTP_PORT,
    taskPool
}