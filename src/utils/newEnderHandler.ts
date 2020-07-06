import { logger } from "../common"

type Fn = () => (Promise<any>| any)

export function newEnderHandler() {
    let enders: Fn[] = []
    const add = (ender: Fn) => {
        enders.push(ender)
    }
    const stop = async () => {
        console.log(`Stopping ${enders.length} handlers...`)
        await Promise.all(
            enders.map((ender) =>
                Promise.resolve(ender())
                    .catch((err) => logger(String(err))
                    .then(() => console.log('end'))
            ))
        )
        logger('stopped!')
        process.exit()
    }
    ['SIGINT', 'SIGTERM'].forEach((ev) => {
        process.on(ev, stop)
    })
    return add
}