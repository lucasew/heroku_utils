/**
 * HTTP methods
 */
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE"

/**
 * HTTP event model emitted from a HTTP request
 */
export interface HTTPEvent<B> {
    body: B,
    client_ip: string,
    headers: Map<string, string>
    method: HTTPMethod
    query: Map<string, string>
    url: URL
}

/**
 * HTTP body validator that receives something that needs to be validated and rejects if is invalid
 * You can use joi for this (y)
 */
export type HTTPBodyValidator<B> = 
    (req: HTTPEvent<B>) => Promise<HTTPEvent<B>>