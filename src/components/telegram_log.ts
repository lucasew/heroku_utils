import getenv from 'getenv'
import {TaskRunner} from '../model/taskRunner'
import axios from 'axios'


export interface TelegramLoggerConfig {
    token: string,
    chat: string
}

export function newLogger(runner: TaskRunner, config: TelegramLoggerConfig) {
    const api = axios.create({
        baseURL: `https://api.telegram.org/bot${config.token}`,
    })
    if (config.token === '' || config.chat === '') {
        console.log('Can\'t setup bot. Token or chat not defined')
        return console.log
    } else {
        api.get('/getMe')
            .then((res) => console.log(res.data))
    }
    return async function postMessage(msg: string) {
        console.log(msg)
        runner(async () => {
            api.get('/sendMessage', {
                params: {
                    chat_id: config.chat,
                    text: msg
                }
            })
        })
    }
}