import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Product } from '../models/Product';
import { addProduct, getProducts } from "../controllers/productController";

const router = Router();
let products: Product[] = [];

const taskValidationRules = [
	body('title').notEmpty().isString().withMessage('Title is required'),
	body('description').notEmpty().isString().withMessage('Description is required'),
	body('link').notEmpty().isString().withMessage('Link is required'),
];

interface QueryParams {
	locale: 'USA' | 'Ukraine';
	lang: 'en' | 'ru' | 'ua';
}

router.post('/', taskValidationRules, (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	return addProduct(req, res);
});

router.get('/', getProducts);

router.put('/:id', taskValidationRules, (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const product = products.find((t) => t.id === parseInt(req.params.id));

	if (!product) {
		res.status(404).send('Product not found');
	} else {
		product.title = req.body.title || product.title;
		product.description = req.body.description || product.description;
		product.link = req.body.link || product.link;

		res.json(product);
	}
});

router.delete('/:id', (req: Request, res: Response) => {
	const index = products.findIndex((t) => t.id === parseInt(req.params.id));

	if (index === -1) {
		res.status(404).send('Task not found');
	} else {
		products.splice(index, 1);
		res.status(204).send();
	}
});
export default router;