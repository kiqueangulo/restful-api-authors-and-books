import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

import Log from "../utils/log";
import { IUser } from "../models/user.model";
import { IBook } from "../models/book.model";

export default function Validate(schema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            return next();
        } catch (error) {
            Log.error(error);

            return res.status(422).json({ error });
        }
    };
}

interface IUserSchema extends IUser {
    passwordConfirmation: string;
}

export const Schemas = {
    user: {
        create: Joi.object<IUserSchema>({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required().label("Password"),
            passwordConfirmation: Joi.any()
                .equal(Joi.ref("password"))
                .required()
                .label("Password confirmation")
                .options({ messages: { "any.only": "{{#label}} does not match" } })
        }),
        update: Joi.object<IUserSchema>({
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(6).label("Password"),
            passwordConfirmation: Joi.any()
                .equal(Joi.ref("password"))
                .label("Password confirmation")
                .options({ messages: { "any.only": "{{#label}} does not match" } }),
            books: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        })
    },
    book: {
        create: Joi.object<IBook>({
            title: Joi.string().required(),
            author: Joi.array().items(Joi.string()).required(),
            description: Joi.string()
        }),
        update: Joi.object<IBook>({
            title: Joi.string(),
            author: Joi.array().items(Joi.string()),
            description: Joi.string(),
            users: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        })
    }
};
