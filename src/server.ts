import dotenv from 'dotenv'
import importModules from './moduleImporter'
import {join} from 'path'
import { logger, addEndHandler } from './common'

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
    const components = [
        'browser',
        'http',
        'telegram',
        'unhandledPromiseHandler',
        'uptime'
    ].map((component) => {
        const imported = require(join(__dirname, 'components', component)).default
        if (imported === undefined) {
            console.log(`component ${component} is not defined`)
            return {}
        }
        return imported
    })
    const setups = components.map((c) => {
        const {setup} = c
        return setup
    })
    const launchs = components.map((c) => {
        const {launch} = c
        return launch
    })
    const destroys = components.map((c) => {
        const {destroy} = c
        return destroy
    })
    await runFuncs(setups)
    await importModules(join(__dirname, 'modules'))
    await runFuncs(launchs)
    logger(`startup done in ${process.uptime()}s`)
    addEndHandler(() => runFuncs(destroys))
}

main()