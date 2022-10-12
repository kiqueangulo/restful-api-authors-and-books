import express from 'express';

import controller from '../controllers/Author';
import ValidateSchema, { Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.author.create), controller.createAuthor);

router.get('/', controller.readAllAuthors);

router.get('/:authorId', controller.readAuthor);

router.put('/:authorId', ValidateSchema(Schemas.author.update), controller.updateAuthor);

router.delete('/:authorId', controller.deleteAuthor);

export = router;
