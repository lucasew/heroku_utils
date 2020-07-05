import {Router} from 'express'
import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

export default interface ModuleContext {
    registerRoutes: (register: (router: Router) => void) => void
    registerBotHandlers: (register: (bot: Telegraf<TelegrafContext>) => void) => void
}