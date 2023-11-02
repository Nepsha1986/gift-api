import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import productRoutes from './src/routes/products';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json()); // Add this line to enable JSON parsing in the request body

app.use('/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});