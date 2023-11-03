import { Router} from 'express';
import { getIdea, getIdeas } from "../controllers/ideaController";

const router = Router();

router.get('/', getIdeas);
router.get('/:name', getIdea);
export default router;