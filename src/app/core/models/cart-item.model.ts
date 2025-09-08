import { Book } from "./book.model";

export interface CartItem {
    product: Book,
    quantity: number
}