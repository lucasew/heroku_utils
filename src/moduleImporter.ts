import {statSync, readdir} from 'fs'
import {join} from 'path'
import {promisify} from 'util'
import Router from 'express-promise-router'

import {logger, bot} from './config'
import ModuleContext from './modules/moduleContext'

const preaddir = promisify(readdir)

export default async function importModules(dir: string) {
    let router = Router()
    let promises: Promise<any>[] = []
    const diritem = (item: string) => join(dir, item)
    let items = (await preaddir(dir))
        .filter((item: string) => statSync(diritem(item)).isDirectory())
    logger(`Found modules: ${items.join(', ')}`)
    let imports = items
        .map(async (item: string) => {
            console.log('Importing module ' + item)
            const context: ModuleContext = {
                registerRoutes: (fn) => {
                    let rt = Router()
                    promises.push(
                        Promise.resolve(fn(rt))
                        .then(() => {
                            router.use('/' + item, rt)
                        })
                    )
                },
                registerBotHandlers: (fn) => {
                    promises.push(Promise.resolve(fn(bot)))
                }
            }
            return require(diritem(item)).default(context)
        })
    await Promise.all(imports)
    await Promise.all(promises)
    return router
}