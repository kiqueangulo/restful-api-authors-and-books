import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';

const router = express();

/* Connect to Mongo */
mongoose
    .connect(config.mongo.url)
    .then(() => {})
    .catch((error) => {});
