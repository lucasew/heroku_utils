import {Source, EventHandler} from '../../model/source'
import {newBroadcaster} from '../../utils/eventBroadcast'

export function newTimer(interval_ms: number): Source<number> {
    let i = 0
    let running = false
    const [addListener, broadcast] = newBroadcaster<number>()
    setInterval(() => {
        if (running) {
            return
        }
        running = true
        broadcast(i)
        i++
        running = false
    }, interval_ms)
    return addListener
}