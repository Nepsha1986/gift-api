import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import ideaRoutes from '../src/routes/ideas';
const app: Express = express();

app.use(express.json()); // Add this line to enable JSON parsing in the request body

app.use('/api/ideas', ideaRoutes);
app.use('/api/test', (req, res) => {
	res.json({
		test: 'test-2',
		user: process.env.DATABASE_USER
	})
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

export { app };