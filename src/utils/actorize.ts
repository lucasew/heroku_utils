import {Actor, ActorFunction} from '../model/actor'
import {logger} from '../common'

interface ActorParameters {
    maxTries?: number,
    delayBetweenTries: number,
}

export function actorize<Req, Res>(
    fn: ActorFunction<Req, Res|Promise<Res>>,
    taskRunner: (fn: () => void) => void,
    params?: ActorParameters
): Actor<Req, Res> {
    const maxTries = params && params.delayBetweenTries ? params.delayBetweenTries : 1
    const delayBetweenTries = params && params.delayBetweenTries ? params.delayBetweenTries : 1
    return function(req: Req) {
        return new Promise<Res>((resolve, reject) => {
            let tentative = 0
            const theTask = () => {
                tentative++
                const res = fn(req)
                Promise.resolve(res)
                    .then(resolve)
                    .catch((err) => {
                        // console.log(err)
                        if (tentative > maxTries) {
                            logger(`task failed more than ${maxTries} times. giving up
                            ${err}`)
                        } else {
                            setTimeout(() => taskRunner(theTask), delayBetweenTries)
                        }
                    })
            }
            taskRunner(theTask)
        })
    }
}