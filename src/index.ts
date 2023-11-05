import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import ideaRoutes from '../src/routes/ideas';
const app: Express = express();

app.use(express.json()); // Add this line to enable JSON parsing in the request body

app.use('/ideas', ideaRoutes);
app.use('/api/test', (req, res) => {
	res.json({
		test: 'test'
	})
});

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, TypeScript Express!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

export { app };