export default async function member<T>(things: any[], key: string, validator?: (v: any) => Promise<T | undefined>): Promise<T[]> {
    const firstPart = things
        .filter((thing) => thing !== undefined)
        .map((thing) => thing[key])
    if (validator) {
        const validated = await Promise.all(firstPart.map(validator))
        const filtered = validated.filter((v) => v !== undefined)
        return filtered as T[]
    }
    return firstPart as T[]
}