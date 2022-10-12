import express from 'express';

import controller from '../controllers/Author';

const router = express.Router();

router.post('/', controller.createAuthor);

router.get('/', controller.readAllAuthors);

router.get('/:authorId', controller.readAuthor);

router.put('/:authorId', controller.updateAuthor);

router.delete('/:authorId', controller.deleteAuthor);

export = router;
