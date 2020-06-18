/**
 * A function that can be converted into a actor
 */
export type ActorFunction<Request, Response> =
    (request: Request) => Response

/**
 * A actor created from a actor function, calling it emits a message that is queued as a task to be handled
 */
export type Actor<Request, Response> =
    (request: Request) => Promise<Response>