import { Request, Response } from 'express';

import { db } from "../db";
import { Product } from "../models/Product";

export const addProduct = async (req: Request, res: Response) => {
	const data: Omit<Product, 'id'> = {
		title: req.body.title,
		description: req.body.description,
		link: req.body.link
	};

	const newProduct = await db.collection('products').insertOne(data);
	res.status(201).json(newProduct);
}
export const getProducts = async (req: Request, res: Response) => {
	const data = await db.collection('products').find({}).toArray();

	res.json(data);
};