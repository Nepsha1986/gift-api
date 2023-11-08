import { Request, Response } from 'express';

import { db } from "../db";
import { Idea } from "../models/Idea";
import { ObjectId } from "mongodb";

type Params = {
	refId: string;
	locale: string;
}
export const getRelatedProducts = async (req: Request, res: Response) => {
	const { locale, refId } = req.params as Params;

	const data = await db.collection('ideas').findOne({locale, refId});

	if (!data) {
		res.json({});
	} else {
		res.json(data);
	}
};

export const getIdea = async (req: Request, res: Response) => {
	const refId = req.params.refId;
	const data = await db.collection('ideas').find({refId}).toArray();

	if (!data) {
		res.json({});
	} else {
		res.json(data);
	}
}

export const getIdeas = async (req: Request, res: Response) => {
	const queryParams = req.query;
	const data = await db.collection('ideas').find(queryParams).toArray();

	res.json(data);
};

export const addIdea = async (req: Request, res: Response) => {
	const existingRef = await db.collection('ideas').findOne({ refId: req.body.refId, locale: req.body.locale });

	if (existingRef) {
		return res.status(400).json({ error: 'An idea with this refId already exists' });
	}

	const data: Omit<Idea , '_id'> = {
		refId: req.body.refId,
		locale: req.body.locale,
		products: req.body.products,
	};

	const newIdea = await db.collection('ideas').insertOne(data);
	res.status(201).json(newIdea);
}

export const update = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const collection = db.collection<Idea>('ideas');
	const query = {_id: new ObjectId(_id)};

	const relatedProducts = await collection.findOne(query);

	if (!relatedProducts) {
		res.status(404).send('Related products not found');
	} else {
		const updated = await collection.updateOne(query, { $set: {...req.body} });
		res.json(updated)
	}
}