import { ObjectId } from "mongodb";

type Locale = 'en-US' | 'ru-UA' | 'uk-UA';
export interface Product {
	_id: ObjectId,
	imgSrc: string,
	refId: string,
	title: string;
	description: string;
	link: string;
	locale: Locale;
}