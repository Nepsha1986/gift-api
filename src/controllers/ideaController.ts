import { Request, Response } from 'express';

import { db } from "../db";

export const getIdea = async (req: Request, res: Response) => {
	const name = req.params.name;
	const data = await db.collection('ideas').findOne({name});

	if (!data) {
		res.json({});
	} else {
		res.json(data);
	}
}

export const getIdeas = async (req: Request, res: Response) => {
	const data = await db.collection('ideas').find().toArray();

	res.json(data);
};