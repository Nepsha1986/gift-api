import { ObjectId } from "mongodb";
export interface Product {
	title: string;
	description: string;
	link: string;
}

export interface Idea {
	_id: ObjectId,
	_ref_id: string,
	name: string,
	products: Product[],
}