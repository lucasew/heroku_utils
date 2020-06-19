import {TaskRunner} from '../model/taskRunner'
import {TorPromise} from '../model/t_or_promise'

export function newTaskPool(concurrentTasks: number): TaskRunner {
    let queue: (() => TorPromise<void>)[] = []
    let currentRunningTasks = 0
    const incr = (n: number) => {
        currentRunningTasks+= n
    }
    const decr = () => {
        currentRunningTasks--
        handler()
    }
    async function handler() {
        // console.log(`queue size: ${queue.length}`)
        if (queue.length == 0) {
            return
        }
        const tasksToStart = concurrentTasks - currentRunningTasks
        if (tasksToStart == 0) {
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