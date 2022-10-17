import express from 'express';

import controller from '../controllers/User';
import ValidateSchema, { Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.user.create), controller.createUserHandler);

router.get('/', controller.getAllUsersHandler);

router.get('/:userId', controller.getUserHandler);

router.put('/:userId', ValidateSchema(Schemas.user.update), controller.updateUserHandler);

router.delete('/:userId', controller.deleteUserHandler);

export = router;
