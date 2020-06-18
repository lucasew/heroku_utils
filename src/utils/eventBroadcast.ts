import {EventHandler, Source} from '../model/source'

export function newBroadcaster<E>(): [Source<E>, EventHandler<E>] {
    let subscribers: EventHandler<E>[] = []
    const broadcast = (ev: E) => {
        subscribers.forEach((sub) => {
            sub(ev)
        })
    }
    const addListener = (h: EventHandler<E>) => {
        subscribers.push(h)
    }
    return [addListener, broadcast]
}