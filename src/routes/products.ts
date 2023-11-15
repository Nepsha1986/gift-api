import { Request, Response, Router } from 'express';
import { body, validationResult } from "express-validator";
import { add, get, getAll, deleteItem, update } from "../controllers/productController";

const router = Router();

const ProductValidationRules = [
	body('title').notEmpty().isString(),
	body('description').notEmpty().isString(),
	body('link').notEmpty().isString(),
	body('locale').notEmpty().withMessage('Locale is required').isLocale().withMessage('Should be a valid locale'),
	body('refId').optional().isString()
];

router.get('/:id', get);
router.get('/', getAll);
router.post('/', ProductValidationRules, (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	return add(req, res);
});
router.put('/:id', update);
router.delete('/:id', deleteItem);

export default router;