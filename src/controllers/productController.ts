import { Request, Response } from 'express';

import { db } from "../db";
import { Product } from "../models/Product";

const DB_COLLECTION = 'products';

export const add = async (req: Request, res: Response) => {
	const { title, description, refId, locale, link } = req.body as Product;

	const data: Omit<Product , '_id'> = {
		title,
		description,
		refId,
		locale,
		link
	};

	const newProduct = await db.collection(DB_COLLECTION).insertOne(data);
	res.status(201).json(newProduct);
}

export const getAll = async (req: Request, res: Response) => {
	const queryParams = req.query;

	const data = await db.collection(DB_COLLECTION).find(queryParams).toArray();

	res.json(data);
};