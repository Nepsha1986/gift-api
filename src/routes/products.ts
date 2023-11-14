import { Request, Response, Router } from 'express';
import { body, validationResult } from "express-validator";
import { add, getAll } from "../controllers/productController";
import { getIdeas } from "../controllers/ideaController";

const router = Router();

const ProductValidationRules = [
	body('title').notEmpty().isString(),
	body('description').notEmpty().isString(),
	body('link').notEmpty().isString(),
	body('locale').notEmpty().withMessage('Locale is required').isLocale().withMessage('Should be a valid locale'),
	body('refId').optional().isString()
];

router.get('/', getAll);
router.post('/', ProductValidationRules, (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	return add(req, res);
});

export default router;