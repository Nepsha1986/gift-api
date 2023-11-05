import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import ideaRoutes from '../src/routes/ideas';
const app: Express = express();

// Enables JSON parsing in the request body
app.use(express.json());

app.use('/api/v1/ideas', ideaRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

export { app };