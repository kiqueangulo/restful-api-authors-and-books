import express from 'express';

import controller from '../controllers/Book';
import ValidateSchema, { Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.book.create), controller.createBookHandler);

router.get('/', controller.getAllBooksHandler);

router.get('/:bookId', controller.getBookHandler);

router.put('/:bookId', ValidateSchema(Schemas.book.update), controller.updateBookHandler);

router.delete('/:bookId', controller.deleteBookHandler);

export = router;
