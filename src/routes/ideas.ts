import { Request, Response, Router } from 'express';
import { getIdea, getIdeas } from "../controllers/ideaController";
import { body, validationResult } from "express-validator";
import { addIdea } from "../controllers/ideaController";

const router = Router();

const IdeaValidationRules = [
	body('_ref_id').notEmpty().isString().withMessage('Reference id is required'),
	body('name').notEmpty().isString().withMessage('Name is required'),
	body('products').isArray(),
	body('products.*.title').notEmpty().isString(),
	body('products.*.description').notEmpty().isString(),
	body('products.*.link').notEmpty().isString()
];

router.get('/', getIdeas);
router.get('/:_ref_id', getIdea);
router.post('/', IdeaValidationRules, (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	return addIdea(req, res);
});

// Examples:
// router.put('/:id', taskValidationRules, (req: Request, res: Response) => {
// 	const errors = validationResult(req);
//
// 	if (!errors.isEmpty()) {
// 		return res.status(400).json({ errors: errors.array() });
// 	}
//
// 	const product = products.find((t) => t.id === parseInt(req.params.id));
//
// 	if (!product) {
// 		res.status(404).send('Product not found');
// 	} else {
// 		product.title = req.body.title || product.title;
// 		product.description = req.body.description || product.description;
// 		product.link = req.body.link || product.link;
//
// 		res.json(product);
// 	}
// });
//
// router.delete('/:id', (req: Request, res: Response) => {
// 	const index = products.findIndex((t) => t.id === parseInt(req.params.id));
//
// 	if (index === -1) {
// 		res.status(404).send('Task not found');
// 	} else {
// 		products.splice(index, 1);
// 		res.status(204).send();
// 	}
// });
export default router;