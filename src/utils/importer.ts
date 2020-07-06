import {statSync as stat, readdir as _readdir} from 'fs'
import {join} from 'path'
import {promisify} from 'util'
import or from '../utils/or'

const readdir = promisify(_readdir)

export default async function importer<T>(dir: string, validator?: (v: any) => Promise<T>) {
    const getElement = (item: string) => join(dir, item)
    let items = (await readdir(dir))
        .filter((item: string) => !item.startsWith('index'))
        .map((item) => item.replace(RegExp('\\.[tj]s'), ''))
        .map((item) => {
            return {
                ...require(getElement(item)).default,
                name: item
            }
        })
        .map(or(validator, (v) => Promise.resolve(v as T)))
    return await Promise.all(items)
}