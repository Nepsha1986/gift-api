import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Product } from '../models/Product';

const router = Router();
let products: Product[] = [];

const taskValidationRules = [
	body('title').notEmpty().withMessage('Title is required'),
	body('description').notEmpty().withMessage('Description is required'),
	body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

router.post('/', (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const newProduct: Product = {
		id: products.length + 1,
		title: req.body.title,
	};

	products.push(newProduct);
	res.status(201).json(newProduct);
});

router.get('/', (req: Request, res: Response) => {
	res.json(products);
});

router.get('/:id', (req: Request, res: Response) => {
	const task = products.find((t) => t.id === parseInt(req.params.id));

	if (!task) {
		res.status(404).send('Task not found');
	} else {
		res.json(task);
	}
});

router.put('/:id', (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const task = products.find((t) => t.id === parseInt(req.params.id));

	if (!task) {
		res.status(404).send('Task not found');
	} else {
		task.title = req.body.title || task.title;

		res.json(task);
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