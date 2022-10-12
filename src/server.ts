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
