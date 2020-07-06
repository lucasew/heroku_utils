import {addEndHandler, logger} from '../common'

export default {
    setup
}

async function setup() {
    process.on('unhandledRejection', (err) => {
        logger(`UNHANDLED PROMISE REJECTION
        ${JSON.stringify(err, null, 2)}`)
    })
    addEndHandler(() => logger('stopping...'))
}
