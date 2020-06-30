import {Router} from 'express'

export default interface ModuleContext {
    registerRoutes: (register: (router: Router) => Promise<void>) => Promise<void>
}