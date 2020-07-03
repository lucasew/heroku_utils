type Fn = () => (Promise<any>| any)

export function newEnderHandler() {
    let enders: Fn[] = []
    const add = (ender: Fn) => {
        enders.push(ender)
        console.log('add')
    }
    const end = async () => {
        Promise.all(
            enders.map((ender) =>
                Promise.resolve(ender())
            )
        ).then(() => process.exit())
    }
    process.on('SIGINT', end)
    process.on('SIGTERM', end)
    return [add, end]
}