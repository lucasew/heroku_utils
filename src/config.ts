import dotenv from 'dotenv'
import getenv from 'getenv'
dotenv.config()

export default {
    HTTP_PORT: getenv.int("PORT", 3000)
}