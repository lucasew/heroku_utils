export function newUptime() {
    let i = 0;
    setInterval(() => {
        i++
    }, 1000)
    return () => i
}