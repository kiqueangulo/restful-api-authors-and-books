import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import Logging from './library/Logging';
import { config } from './config/config';

const router = express();

const startServer = () => {
    router.use((req, res, next) => {
        /* Log the request */
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /* Log the response */
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /* Rule of API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

            return res.status(200).json({});
        }

        next();
    });

    /* The routes go here - skip for now */

    /* Healthcheck */
    router.get('/ping', (req, res) => res.status(200).json({ message: 'API working' }));

    /* Error handling */
    router.use((req, res) => {
        const error = new Error('Not found');

        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });
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
