import { Request, Response } from 'express';
import { ObjectId } from "mongodb";

import { db } from "../db";
import { Product } from "../models/Product";

const DB_COLLECTION = 'products';

type PageableQuery = {
	page: string,
	pageSize: string;
}

type FilterQuery = {
	refId: string,
	locale: string,
}

type Searchable = {
	search: string;
}

export const add = async (req: Request, res: Response) => {
	const {title, description, refId, locale, link} = req.body as Product;

	const data: Omit<Product, '_id'> = {
		title,
		description,
		refId,
		locale,
		link
	};

	const newProduct = await db.collection(DB_COLLECTION).insertOne(data);
	res.status(201).json(newProduct);
}

export const get = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const query = {_id: new ObjectId(id)};
		const data = await db.collection(DB_COLLECTION).findOne(query);
		res.json(data || {});
	} catch (error) {
		console.error('Error getting product:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const {
			page,
			pageSize,
			search,
			...rest
		} = req.query as PageableQuery & FilterQuery & Searchable;

		const pageParsed: number = parseInt(page) || 1;
		const pageSizeParsed: number = parseInt(pageSize) || 10;

		const searchQuery = search
			? {
				$or: [
					{refId: {$regex: search, $options: 'i'}},
					{title: {$regex: search, $options: 'i'}},
				],
			}
			: {};

		const totalItems = await db.collection(DB_COLLECTION).countDocuments({...searchQuery, ...rest});
		const totalPages = Math.ceil(totalItems / pageSizeParsed);

		const items = await db.collection(DB_COLLECTION)
			.find({...searchQuery, ...rest})
			.skip((pageParsed - 1) * pageSizeParsed)
			.limit(pageSizeParsed)
			.toArray();

		res.json({
			items,
			page: pageParsed,
			pageSize: pageSizeParsed,
			totalItems,
			totalPages,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};

export const update = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const collection = db.collection<Product>(DB_COLLECTION);
	const query = {_id: new ObjectId(_id)};

	const relatedProduct = await collection.findOne(query);

	if (!relatedProduct) {
		res.status(404).send('Product not found');
	} else {
		const updated = await collection.findOneAndUpdate(query, {$set: {...req.body}});
		res.json(updated)
	}
}

export const deleteItem = async (req: Request, res: Response) => {
	const _id: ObjectId = new ObjectId(req.params.id);

	try {
		const data = await db.collection(DB_COLLECTION).deleteOne({_id});

		if (data.deletedCount === 1) {
			res.status(204).send();
		} else {
			res.status(404).json({error: 'Product not found'});
		}
	} catch (error) {
		console.error('Error deleting product:', error);
		res.status(500).json({error: 'Internal server error'});
	}
}