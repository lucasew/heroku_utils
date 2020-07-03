import moduleContext from '../moduleContext'
import telegram from './telegram'

export default async (ctx: moduleContext) => {
    return await telegram()
}