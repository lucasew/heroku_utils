import {statSync as stat, readdir as _readdir} from 'fs'
import {join} from 'path'
import {promisify} from 'util'
import Router from 'express-promise-router'

import {logger} from './common'
import {externalUse} from './components/http'
import {bot} from './components/telegram'

const readdir = promisify(_readdir)

export default async function importModules(dir: string) {
    let router = Router()
    const diritem = (item: string) => join(dir, item)
    let items = (await readdir(dir))
        .filter((item: string) => stat(diritem(item)).isDirectory())
    logger(`Found modules: ${items.join(', ')}`)

    let tasks: Promise<any>[] = []
    let imports = items
        .map(async (item: string) => {
            console.log('Importing module ' + item)
            const {telegram, http} = require(diritem(item)).default()
            if (telegram) {
                tasks.push(Promise.resolve(telegram(bot)))
            }
            if (http) {
                tasks.push(new Promise(async (resolve, reject) => {
                    let rt = Router()
                    await Promise.resolve(http(rt)).catch(reject)
                    router.use(`/${item}`, rt)
                    resolve()
                }))
            }
        })
    await Promise.all([...imports, ...tasks])
    externalUse(router)
}