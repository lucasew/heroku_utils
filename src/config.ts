import getenv from 'getenv'

import { newTaskPool } from './utils/newTaskPool'
import { newEnderHandler } from './utils/newEnderHandler'

export default (() => {
    return {
        HTTP_PORT: getenv.int("PORT", 3000),
        concurrentTasks: getenv.int("CONCURRENT_TASKS", 10),
        concurrentPuppeteerJobs: getenv.int('CONCURRENT_PUPPETEER_JOBS', 2),
        telegram: {
            adm: getenv.string('TELEGRAM_LOG_CHAT'),
            token: getenv.string('TELEGRAM_LOG_BOT')
        }
    }
})()

