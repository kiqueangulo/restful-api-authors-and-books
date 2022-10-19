import { Router } from 'express';

import controller from '../controllers/book.controller';
import Validate, { Schemas } from '../middleware/validateSchema';

const router = Router();

router.post('/', Validate(Schemas.book.create), controller.createBookHandler);

router.get('/', controller.getAllBooksHandler);

router.get('/:bookId', controller.getBookHandler);

router.put('/:bookId', Validate(Schemas.book.update), controller.updateBookHandler);

router.delete('/:bookId', controller.deleteBookHandler);

export default router;
