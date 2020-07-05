import express, {ErrorRequestHandler} from 'express'
import morgan from 'morgan'
import {logger, HTTP_PORT, bot} from './config'
import importModules from './moduleImporter'
import {join} from 'path'
import {addEndHandler} from './config'

process.on('unhandledRejection', (err) => {
    logger(`UNHANDLED PROMISE REJECTION
    ${JSON.stringify(err, null, 2)}`)
})

let app = express()
app.use(morgan('tiny'))

async function setupServer() {
    addEndHandler(() => logger('stopping...'))

    app.get('/favicon.ico', (request, response) => {
        response.status(404)
    })

    app.use(await importModules(join(__dirname, 'modules')))

    app.use((request, response) => {
        throw {
            status: 404,
            message: 'route not found'
        }
    })
    app.use(errorHandler)
}

setupServer().then(() => {
    bot.launch({
        polling: {
            limit: 10
        }
    })
    addEndHandler(() => bot.stop())
    
    const server = app.listen(HTTP_PORT, () => {
        logger("Listening at: " + HTTP_PORT)
    })
    addEndHandler(() => new Promise((resolve, reject) => {
        server.close((err) => err ? reject(err) : resolve())
    }))
})

const errorHandler: ErrorRequestHandler = (err, request, response, next) => {
    let {message, status, stack, joi} = err
    if (joi) {
        status = 400
    }
    if (status === 500) {
        logger(`ERRO 500 detectado
        ${message}
        ${stack}`)
    }
    response.status(status || 500).json({
        error: message,
        stackStace: stack
    })
}
