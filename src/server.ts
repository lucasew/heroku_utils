import express from 'express'
import morgan from 'morgan'
import {newExpressEventSource} from './components/eventSources/express'
import {newRSSEventSource} from './components/eventSources/rss'
import {newTaskPool} from './components/taskPool'
import {newTimer} from './components/eventSources/timer'

let app = express()
app.use(morgan('tiny'))

const taskPool = newTaskPool(2)
const timer = newTimer(10000)

// setup express event source
const [handler, eventSource] = newExpressEventSource(async (data) => data, taskPool)
eventSource(console.log)
app.get("/teste", handler)

try {
    let [subs, tick] = newRSSEventSource("https://www.aquiagora.net/rss", taskPool)
    timer(tick)
    subs(console.log)
} catch(e) {
    console.error(e)
}

timer(console.log)


app.listen(3000)