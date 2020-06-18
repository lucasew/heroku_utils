import express from 'express'
import morgan from 'morgan'
import {newRSSEventSource} from './components/eventSources/rss'
import {newTimer} from './components/eventSources/timer'
import config from './config'

import routes from './routes'

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

app.listen(config.HTTP_PORT)