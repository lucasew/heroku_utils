export interface RSSFeedMetadata {
    image?: {
        link?: string
        url?: string
        title?: string
    }
    link?: string
    title: string
    feedURL: URL
    description?: string
}

export interface RSSItemMetadata {
    link?: string
    guid?: string
    title: string
    pubDate?: Date
    creator?: string
    content?: string
    contentSnippet?: string
    categories: string[]
}

export interface RSSEvent {
    feed: RSSFeedMetadata
    item: RSSItemMetadata
}