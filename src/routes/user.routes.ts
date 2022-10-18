import { Router } from 'express';

import controller from '../controllers/user.controller';
import ValidateSchema, { Schemas } from '../middleware/validateSchema';

const router = Router();

router.post('/', ValidateSchema(Schemas.user.create), controller.createUserHandler);

router.get('/', controller.getAllUsersHandler);

router.get('/:userId', controller.getUserHandler);

router.put('/:userId', ValidateSchema(Schemas.user.update), controller.updateUserHandler);

router.delete('/:userId', controller.deleteUserHandler);

export default router;
