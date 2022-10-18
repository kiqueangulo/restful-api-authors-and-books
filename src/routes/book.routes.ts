import { Router } from 'express';

import controller from '../controllers/book.controller';
import ValidateSchema, { Schemas } from '../middleware/ValidateSchema';

const router = Router();

router.post('/', ValidateSchema(Schemas.book.create), controller.createBookHandler);

router.get('/', controller.getAllBooksHandler);

router.get('/:bookId', controller.getBookHandler);

router.put('/:bookId', ValidateSchema(Schemas.book.update), controller.updateBookHandler);

router.delete('/:bookId', controller.deleteBookHandler);

export default router;
