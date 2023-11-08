import { Request, Response, Router } from 'express';
import { getIdea, getIdeas, getRelatedProducts, update } from "../controllers/ideaController";
import { body, validationResult } from "express-validator";
import { addIdea } from "../controllers/ideaController";

const router = Router();

const IdeaValidationRules = [
	body('refId').notEmpty().isString().withMessage('Reference id is required'),
	body('locale').notEmpty().withMessage('Locale is required').isLocale().withMessage('Should be a valid locale'),
	body('products').isArray(),
	body('products.*.title').notEmpty().isString(),
	body('products.*.description').notEmpty().isString(),
	body('products.*.link').notEmpty().isString()
];

router.get('/', getIdeas);
router.get('/:refId', getIdea);
router.get('/:locale/:refId', getRelatedProducts);
router.post('/', IdeaValidationRules, (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	return addIdea(req, res);
});

router.put('/:id', update);

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