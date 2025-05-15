export interface Content {
    title:string,
    thumbnail:string,
    id:number,
    content:string,
    status?: 'draft' | 'published' | 'scheduled'
    publishedAt ?: Date,
    createdAt ?: Date,
    updatedAt ?: Date,
}