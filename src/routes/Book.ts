import express from 'express';

import controller from '../controllers/Book';

const router = express.Router();

router.post('/', controller.createBook);

router.get('/', controller.readAllBooks);

router.get('/:bookId', controller.readBook);

router.put('/:bookId', controller.updateBook);

router.delete('/:bookId', controller.deleteBook);

export = router;
