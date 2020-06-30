import Mercury from '@postlight/mercury-parser' 
import {actorize} from '../../utils/actorize'
import {taskPool} from '../../config'

type MercuryParserArticle = 'html' | 'markdown' | 'text' | undefined
const articleFuncGen = (format: MercuryParserArticle) => 
    actorize<string, Mercury.ParseResult>((url) => Mercury.parse(url, {
        contentType: format
    }), taskPool)

export const articleHtml = articleFuncGen('html')
export const articleMarkdown = articleFuncGen('markdown')
export const articleText = articleFuncGen('text')
