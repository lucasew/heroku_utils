import {statSync, readdir} from 'fs'
import {join} from 'path'
import {promisify} from 'util'
import Router from 'express-promise-router'

import {logger} from './config'
import ModuleContext from './modules/moduleContext'

const preaddir = promisify(readdir)

export default async function importModules(dir: string) {
    let router = Router()

    const diritem = (item: string) => join(dir, item)
    let items = (await preaddir(dir))
        .filter((item: string) => statSync(diritem(item)).isDirectory())
    logger(`Found modules: ${items.join(', ')}`)
    let imports = items
        .map(async (item: string) => {
            console.log('Importing module ' + item)
            const context: ModuleContext = {
                registerRoutes: async (fn) => {
                    let rt = Router()
                    fn(rt)
                    router.use('/' + item, rt)
                }
            }
            return await require(diritem(item)).default(context)
        })
    await Promise.all(imports)
    return router
}