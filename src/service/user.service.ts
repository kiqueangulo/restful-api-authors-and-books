import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery, Types } from "mongoose";
import { omit } from "lodash";

import UserORM, { IUserModel } from "../models/user.model";

async function createUser(input: DocumentDefinition<Omit<IUserModel, "books" | "addBook">>) {
    try {
        const newUser = await UserORM.create(input);

        return omit(newUser.toJSON(), "password");
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getUser(query: FilterQuery<IUserModel>, options: QueryOptions = { lean: true }) {
    try {
        const user = await UserORM.findOne(query, { __v: false, password: false }, options);

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getAllUsers(query: FilterQuery<IUserModel> = {}, options: QueryOptions = { lean: true }) {
    try {
        const users = await UserORM.find(query, { __v: false, password: false }, options);

        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function updateUser(query: FilterQuery<IUserModel>, update: UpdateQuery<IUserModel>, options: QueryOptions = { new: true }) {
    try {
        return UserORM.findOneAndUpdate(query, update, options);
    } catch (error: any) {
        throw new Error(error);
    }
}

async function deleteUser(query: FilterQuery<IUserModel>) {
    try {
        return UserORM.findOneAndDelete(query);
    } catch (error: any) {
        throw new Error(error);
    }
}

export default { createUser, getUser, getAllUsers, updateUser, deleteUser };
