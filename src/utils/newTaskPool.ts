import {TaskRunner} from '../model/taskRunner'
import {TorPromise} from '../model/t_or_promise'
import {logger} from '../config'
import {addEndHandler} from '../config'

export function newTaskPool(concurrentTasks: number): TaskRunner {
    let queue: (() => TorPromise<void>)[] = []
    let currentRunningTasks = 0
    let isEnd = false
    addEndHandler(() => isEnd = true)
    const incr = (n: number) => {
        currentRunningTasks+= n
    }
    const decr = () => {
        currentRunningTasks--
        if (!isEnd) {
            handler()
        }
    }
    async function handler() {
        // console.log(`queue size: ${queue.length}`)
        if (queue.length == 0) {
            return
        }
        const tasksToStart = concurrentTasks - currentRunningTasks
        if (tasksToStart == 0) {
            logger(`Task pool with size ${concurrentTasks} reached maximum concurrent tasks`)
            return
        }
        incr(tasksToStart)
        let tasks = queue.slice(0, tasksToStart)
        queue = queue.slice(tasksToStart)
        if (tasks.length == 1) {
            tasks[0]()
            decr()
            return
        }
        await Promise.all(tasks.map((task) =>
            new Promise((resolve, reject) =>
                Promise.resolve(task())
                    .then(resolve)
                    .catch(reject)
            ).finally(decr)
        ))
    }
    return function(task: () => TorPromise<void>) {
        queue.push(task)
        handler()
    }
}