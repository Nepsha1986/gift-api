import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import ideaRoutes from '../src/routes/ideas';
import productRoutes from '../src/routes/products';
const app: Express = express();

// Enables JSON parsing in the request body
app.use(express.json());
app.use((req, res, next) => {
	const corsWhitelist = [
		'https://gift-idea.co',
		'https://admin.gift-idea.co'
	];
	if (corsWhitelist.indexOf(req.headers.origin as string) !== -1) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	}

	next();
});

app.use('/api/v1/ideas', ideaRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/test', (req, res) => {
	res.json({
		test: 'test-3',
		user: process.env.DATABASE_USER
	})
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

export { app };