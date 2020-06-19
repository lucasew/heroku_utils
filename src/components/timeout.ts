import {TorPromise} from '../model/t_or_promise'

export async function newTimeout<T>(fn: () => TorPromise<T>, time_ms: number): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        let expired = false
        const timeout = setTimeout(() => {
            expired = true
            return reject({
                message: 'timeout',
                status: 500
            })
        }, time_ms)
        const result = Promise.resolve(fn())
        result.then((v) => {
            if (!expired) {
                clearTimeout(timeout)
                return resolve(v)
            }
        })
    })
}