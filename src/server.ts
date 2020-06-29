import express, {ErrorRequestHandler} from 'express'
import morgan from 'morgan'
import {newRSSEventSource} from './components/eventSources/rss'
import {newTimer} from './components/eventSources/timer'
import {logger, HTTP_PORT} from './config'

import routes from './components/routes'

let app = express()
app.use(morgan('tiny'))

app.use(routes)

const timer = newTimer(10000)

// try {
//     let [subs, tick] = newRSSEventSource("https://www.aquiagora.net/rss", taskPool)
//     timer(tick)
//     subs(console.log)
// } catch(e) {
//     console.error(e)
// }

timer(console.log)

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

app.use((request, response) => {
    throw {
        status: 404,
        message: 'route not found'
    }
})
app.use(errorHandler)
app.listen(HTTP_PORT, () => {
    logger("Listening at: " + HTTP_PORT)
})