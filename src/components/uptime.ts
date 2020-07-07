export let uptime = 0

export default {
    async launch() {
        setInterval(() => {
            uptime++
        }, 1000)
    }
}