import {addEndHandler, logger} from '../common'
import { getFirestore } from './firebase'

export default {
    async setup() {
        process.on('unhandledRejection', (err) => {
            logger(`UNHANDLED PROMISE REJECTION
            ${err}`)

        })
    },
    async launch() {
        const datastore = await getFirestore('unhandledPromise')
        process.on('unhandledRejection', (err) => {
            const data = {
                time: Date.now(),
                err
            }
            datastore.push(data)
        })
        addEndHandler(() => logger('stopping...'))
    }
}