import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { omit } from 'lodash';

import User, { IUserModel } from '../models/User';

async function createUser(input: DocumentDefinition<Omit<IUserModel, 'books'>>) {
    try {
        const newUser = await User.create(input);

        return omit(newUser.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getUser(query: FilterQuery<IUserModel>, options: QueryOptions = { lean: true }) {
    try {
        const user = await User.findOne(query, { __v: false, password: false }, options);

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getAllUsers(query: FilterQuery<IUserModel> = {}, options: QueryOptions = { lean: true }) {
    try {
        const users = await User.find(query, { __v: false, password: false }, options);

        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function updateUser(query: FilterQuery<IUserModel>, update: UpdateQuery<IUserModel>, options: QueryOptions = { new: true }) {
    try {
        return User.findOneAndUpdate(query, update, options);
    } catch (error: any) {
        throw new Error(error);
    }
}

async function deleteUser(query: FilterQuery<IUserModel>) {
    try {
        return User.findOneAndDelete(query);
    } catch (error: any) {
        throw new Error(error);
    }
}

export default { createUser, getUser, getAllUsers, updateUser, deleteUser };
