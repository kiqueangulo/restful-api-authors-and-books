import express from 'express';
import mongoose from 'mongoose';

import Log from './utils/log';
import manage from './middleware/manageServer';
import routes from './routes';
import { config } from './config/config';

const app = express();

const startServer = (): void => {
    /* Track incoming and outgoing status */
    app.use(manage.checkRequestAndResponse);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /* Rules of API */
    app.use(manage.rulesOfHeaders);

    routes(app);

    /* Error handling */
    app.use(manage.generalError);

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
