/**
 * Throw error if v is undefined
 * @param v the value to be checked
 */
export function assertHave<T>(v: T | undefined) {
    if (v === undefined) {
        throw new Error("value should not be undefined but is")
    }
    return v
}