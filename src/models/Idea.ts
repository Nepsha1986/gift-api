import { ObjectId } from "mongodb";
export interface Product {
	title: string;
	description: string;
	link: string;
}

export interface Idea {
	_id: ObjectId,
	refId: string,
	locale: string;
	products: Product[],
}