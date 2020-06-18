/**
 * Source of events, holds subscribers
 */
export type Source<E> = 
    (subscriber: EventHandler<E>) => void

/**
 * Handler of events
 */
export type EventHandler<E> =
    (ev: E) => void

/**
 * Source of events that need another event source to clock it, like a timer or a http request
 */
export type ClockedSource<E> =
    [Source<E>, EventHandler<any>]