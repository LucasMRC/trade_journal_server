
import { Router } from 'express';
import { getAllPlatfoms } from '../controller/index';

const router = Router();

router.get('/', getAllPlatfoms);

export default router;