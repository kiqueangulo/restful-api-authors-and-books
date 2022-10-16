import express from 'express';
import mongoose from 'mongoose';

import Logging from './utils/Logging';
import userRoutes from './routes/User';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';
import { config } from './config/config';

const app = express();

const startServer = (): void => {
    app.use((req, res, next) => {
        /* Log the request */
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /* Log the response */
            Logging.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /* Rule of API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

            return res.status(200).json({});
        }

        next();
    });

    /* Routes */
    app.use('/users', userRoutes);
    app.use('/authors', authorRoutes);
    app.use('/books', bookRoutes);

    /* Healthcheck */
    app.get('/ping', (req, res) => res.status(200).json({ message: 'API working' }));

    /* Error handling */
    app.use((req, res) => {
        const error = new Error('Not found');

        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    app.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};

/* Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to database.');
        startServer(); /* Only start the server if Mongo connects */
    })
    .catch((error) => {
        Logging.error('Unable to connect: ');
        Logging.error(error);
    });
