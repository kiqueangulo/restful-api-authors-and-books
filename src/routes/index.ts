import { Express, Request, Response } from 'express';

import userRouter from './user.routes';
import sessionRouter from './session.routes';
import bookRouter from './book.routes';

function routes(app: Express) {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/sessions', sessionRouter);
    app.use('/api/v1/books', bookRouter);

    app.get('/api/v1/ping', (req, res) => res.status(200).json({ message: 'API working' }));
}

export default routes;
