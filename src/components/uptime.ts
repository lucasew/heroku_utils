export default {
    launch
}

export let uptime = 0

async function launch() {
    setInterval(() => {
        uptime++
    }, 1000)
}
