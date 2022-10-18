import { Router } from 'express';

import controller from '../controllers/session.controller';

const router = Router();

router.post('/', controller.createSessionHandler);

export default router;
