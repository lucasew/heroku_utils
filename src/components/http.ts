import express, {ErrorRequestHandler, Router} from 'express'
import morgan from 'morgan'
import config from '../config'
import {logger} from '../common'

export let app = express()

let destroy = async () => {}

export default {
    setup, 
    launch,
    destroy
}

export function externalUse(router: Router) {
    app.use(router)
}
async function setup() {
    app.use(morgan('tiny'))

    app.get('/favicon.ico', (request, response) => {
        response.status(404)
    })

}

async function launch() {
    app.use((request, response) => {
        throw {
            status: 404,
            message: 'route not found'
        }
    })
    
    app.use(errorHandler)

    const server = app.listen(config.HTTP_PORT, () => {
        logger("Listening at: " + config.HTTP_PORT)
    })
    destroy = () => new Promise((resolve, reject) => {
        server.close((err) => err ? reject(err) : resolve())
    })
}


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