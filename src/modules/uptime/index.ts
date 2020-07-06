import http from './http'
import telegram from './telegram'

export default () => {
    return {
        telegram,
        http
    }
}