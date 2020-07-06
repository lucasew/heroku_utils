import dotenv from 'dotenv'
import {join} from 'path'
import { logger, addEndHandler } from './common'
import importer from './utils/importer'
import member from './utils/member'
import { externalUse as externalTelegramUse } from './components/telegram'
import { externalUse as externalHTTPUse } from './components/http'
import {PluginType as TelegramPluginType} from './components/telegram'
import {PluginType as HTTPPluginType} from './components/http'

type ImportedFn = () => any | undefined

function runFuncs(fns: ImportedFn[]) {
    return Promise.all(
        fns
            .filter((f) => f !== undefined)
            .map((f) => Promise.resolve(f()))
    )
}

async function main() {
    console.log('inicializando...')
    dotenv.config()
    let dirImport = (dir: string) => importer<any>(join(__dirname, dir))
    const components = dirImport('components')
    const modules = dirImport('modules')

    const setup = member<ImportedFn>(await components, 'setup')
    const launch = member<ImportedFn>(await components, 'launch')
    const destroy = member<ImportedFn>(await components, 'destroy')

    await runFuncs(await setup)
    await Promise.all((await modules)
        .map(async (module: any) => {
            if (module === undefined) {
                return
            }
            let name: string | undefined = module.name
            if (name === undefined) { // cant import unnamed modules
                return
            }
            console.log(`loading module ${name}`)
            let telegram: TelegramPluginType | undefined = module.telegram
            if (telegram !== undefined) {
                externalTelegramUse(telegram)
            }
            let http: HTTPPluginType | undefined = module.http
            if (http !== undefined) {
                externalHTTPUse(`/${name}`, http)
            }
        }))
    await launch.then(runFuncs)
    logger(`startup done in ${process.uptime()}s`)
    addEndHandler(() => destroy.then(runFuncs))
}

main()