import {initializeApp, app as fapp} from 'firebase'
import getenv from 'getenv'

const config = getenv.string('FIREBASE_AUTH')

let app: fapp.App | undefined = undefined

export default {
    async setup() {
        app = initializeApp(JSON.parse(config))
    },
    async launch() {
        const firestore = await getFirestore('firebaseLaunch')
        await firestore.push(Math.floor(Date.now() / 1000))
    },
    async destroy() {
    }
}

export async function getFirestore(name: string) {
    if (app) {
        return app.database().ref(name)
    }
    throw new Error('firebase not initialized')
}