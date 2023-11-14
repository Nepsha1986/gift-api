import { Request, Response } from 'express';
import { ObjectId } from "mongodb";

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

export const deleteItem = async (req: Request, res: Response) => {
	const _id: ObjectId = new ObjectId(req.params.id);

	try {
		const data = await db.collection(DB_COLLECTION).deleteOne({ _id });

		if (data.deletedCount === 1) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: 'Product not found' });
		}
	} catch (error) {
		console.error('Error deleting product:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}