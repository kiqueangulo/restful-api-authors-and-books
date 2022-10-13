import express from 'express';

import controller from '../controllers/User';

const router = express.Router();

router.post('/', controller.createUser);

router.get('/', controller.readAllUsers);

router.get('/:userId', controller.readUser);

router.put('/:userId', controller.updateUser);

router.delete('/:userId', controller.deleteUser);

export = router;
