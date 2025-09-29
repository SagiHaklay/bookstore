export interface BookData {
    name: string,
    author: string,
    price: number,
    discount?: number,
    publisher?: string,
    imageUrl?: string,
    image?: File
}