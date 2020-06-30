import express from 'express'

import {HTTPBodyValidator, HTTPEvent, HTTPMethod} from '../model/event/http'
import {Source} from '../model/source'
import {TaskRunner} from '../model/taskRunner'
import {newBroadcaster} from './eventBroadcast'
import {express2httpevent} from './express2httpevent'

export function newExpressEventSource<B> (validator: HTTPBodyValidator<B>, runner: TaskRunner): 
    [express.Handler, Source<HTTPEvent<B>>] 
{
    const [addListener, broadcast] = newBroadcaster<HTTPEvent<B>>()
    const handler = async function (request: express.Request, response: express.Response) {
        express2httpevent(request, response, validator)
            .then((ev) => {
                broadcast(ev)
                response.send({
                    data: "ok"
                })
            })
            .catch((err) => {
                response
                    .status(400)
                    .send({
                        error: err
                    })
            })
    }
    return [handler, addListener]
}