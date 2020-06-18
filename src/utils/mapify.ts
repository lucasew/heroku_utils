/**
 * Convert object into a map
 * @param obj the object
 * @param valueConverter something to handle the values to a target value type
 */
export function mapify<V>(obj: any, valueConverter: (v: any) => V) {
    return new Map(
        Object.entries(obj)
            .map(([k, v]) => [k, valueConverter(v)])
    )
}