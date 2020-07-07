import {initializeApp} from 'firebase'
import getenv from 'getenv'

const config = getenv.string('FIREBASE_AUTH')

export default {
    setup,
    launch,
    destroy
}

const app = initializeApp(JSON.parse(config))

async function setup() {
}

async function launch() {
    const firestore = await getFirestore('firebaseLaunch')
    await firestore.push(Math.floor(Date.now() / 1000))
}
async function destroy() {}

export async function getFirestore(name: string) {
    return app.database().ref(name)
}