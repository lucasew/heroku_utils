import express, {ErrorRequestHandler, Router} from 'express'
import morgan from 'morgan'
import {logger} from '../common'
import PromiseRouter from 'express-promise-router'
import getenv from 'getenv'

const HTTP_PORT = getenv.int("PORT", 3000)

const app = express()

let destroy = async () => {}

export type PluginType = (router: Router) => Promise<void>

export default {
    setup, 
    launch,
    destroy
}

let plugins: [string, (rt: Router) => any][] = []

export function registerPlugin(path: string, fn: (rt: Router) => any) {
    plugins.push([path, fn])
}

async function setup() {
    app.use(morgan('tiny'))

    app.get('/favicon.ico', (request, response) => {
        response.status(404)
    })
}

async function launch() {
    let router = PromiseRouter()
    await Promise.all(plugins.map(async ([key, fn]) => {
        let rt = PromiseRouter()
        await Promise.resolve(fn(rt))
        router.use(key, rt)
    }))
    app.use(router)
    app.use((request, response) => {
        throw {
            status: 404,
            message: 'route not found'
        }
    })
    
    app.use(errorHandler)

    const server = app.listen(HTTP_PORT, () => {
        logger("Listening at: " + HTTP_PORT)
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