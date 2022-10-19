import { Router } from 'express';

import controller from '../controllers/user.controller';
import Validate, { Schemas } from '../middleware/validateSchema';

const router = Router();

router.post('/', Validate(Schemas.user.create), controller.createUserHandler);

router.get('/', controller.getAllUsersHandler);

router.get('/:userId', controller.getUserHandler);

router.put('/:userId', Validate(Schemas.user.update), controller.updateUserHandler);

router.delete('/:userId', controller.deleteUserHandler);

export default router;
