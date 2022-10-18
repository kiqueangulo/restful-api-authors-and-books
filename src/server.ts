import express from 'express';
import mongoose from 'mongoose';

import Log from './utils/log';
import routes from './routes';
import { config } from './config/config';

const app = express();

const startServer = (): void => {
    app.use((req, res, next) => {
        /* Log the request */
        Log.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /* Log the response */
            Log.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
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

    routes(app);

    /* Error handling */
    app.use((req, res) => {
        const error = new Error('Not found');

        Log.error(error);

        return res.status(404).json({ message: error.message });
    });

    app.listen(config.server.port, () => Log.info(`Server is running on port ${config.server.port}.`));
};

/* Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Log.info('Connected to database.');
        startServer(); /* Only start the server if Mongo connects */
    })
    .catch((error) => {
        Log.error('Unable to connect: ');
        Log.error(error);
    });
