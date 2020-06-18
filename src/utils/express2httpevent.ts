import {Request, Response} from 'express'
import {HTTPBodyValidator, HTTPMethod, HTTPEvent} from '../model/event/http'
import {mapify} from './mapify'

export function express2httpevent<B>(
    request: Request, 
    response: Response, 
    bodyValidator: HTTPBodyValidator<B>
): Promise<HTTPEvent<B>> {
    const event = {
        body: request.body,
        client_ip: request.ip,
        headers: mapify(request.headers, String),
        method: request.method as HTTPMethod,
        query: mapify(request.params, String),
        url: new URL(`${request.protocol}://${request.get('host')}${request.originalUrl}`)
    }
    return bodyValidator(event)
}