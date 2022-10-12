import express from 'express';

import controller from '../controllers/Book';
import ValidateSchema, { Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.book.create), controller.createBook);

router.get('/', controller.readAllBooks);

router.get('/:bookId', controller.readBook);

router.put('/:bookId', ValidateSchema(Schemas.book.update), controller.updateBook);

router.delete('/:bookId', controller.deleteBook);

export = router;
