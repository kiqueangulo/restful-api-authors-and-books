import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import Logging from './library/Logging';
import { config } from './config/config';

const router = express();

/* Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to database.');
    })
    .catch((error) => {
        Logging.error('Unable to connect: ');
        Logging.error(error);
    });
