import { Product } from "./Product";

export interface Idea {
	id: string,
	name: string,
	lang: 'en' | 'ru' | 'uk',
	locale: 'USA' | 'Ukraine',
	products: Product[],
}