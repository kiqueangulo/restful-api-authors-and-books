import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { omit } from 'lodash';

import User from '../models/User';

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const user = new User({ _id: new mongoose.Types.ObjectId(), username, email, password });

        await user.save();

        return res.status(201).send(omit(user.toJSON(), 'password'));
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found.' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllUsers = (req: Request, res: Response) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found.' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found.' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createUser, readUser, readAllUsers, updateUser, deleteUser };
