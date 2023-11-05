import { Request, Response } from 'express';

import { clientPromise } from "../db";
import { Idea } from "../models/Idea";

export const getIdea = async (req: Request, res: Response) => {
	const _ref_id = req.params._ref_id;

	const db = (await clientPromise).db('gift-ideas');
	const data = await db.collection('ideas').findOne({_ref_id});

	if (!data) {
		res.json({});
	} else {
		res.json(data);
	}
}

export const getIdeas = async (req: Request, res: Response) => {
	const db = (await clientPromise).db('gift-ideas');
	const data = await db.collection('ideas').find().toArray();

	res.json(data);
};

export const addIdea = async (req: Request, res: Response) => {
	const db = (await clientPromise).db('gift-ideas');
	const existingRef = await db.collection('ideas').findOne({ _ref_id: req.body._ref_id });

	if (existingRef) {
		return res.status(400).json({ error: 'An idea with this _ref_id already exists' });
	}

	const data: Omit<Idea , '_id'> = {
		_ref_id: req.body._ref_id,
		products: req.body.products,
		name: req.body.name,
	};

	const newIdea = await db.collection('ideas').insertOne(data);
	res.status(201).json(newIdea);
}