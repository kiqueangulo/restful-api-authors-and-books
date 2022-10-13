import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

import Logging from '../library/Logging';
import { IUser } from '../models/User';
import { IAuthor } from '../models/Author';
import { IBook } from '../models/Book';

export default function ValidateSchema(schema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
}

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required().label('Password'),
            passwordConfirmation: Joi.any()
                .equal(Joi.ref('password'))
                .required()
                .label('Password confirmation')
                .options({ messages: { 'any.only': '{{#label}} does not match' } })
        }),
        update: Joi.object<IUser>({
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(6).label('Password'),
            passwordConfirmation: Joi.any()
                .equal(Joi.ref('password'))
                .label('Password confirmation')
                .options({ messages: { 'any.only': '{{#label}} does not match' } })
        })
    },
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};
