import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { omit } from "lodash";

import UserORM, { IUser } from "../models/user.model";

async function createUser(input: DocumentDefinition<Omit<IUser, "books" | "addBook">>) {
    try {
        const newUser = await UserORM.create(input);

        return omit(newUser.toJSON(), "password");
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getUser(query: FilterQuery<IUser>, options: QueryOptions = { lean: true }) {
    try {
        const user = await UserORM.findOne(query, { __v: false, password: false }, options);

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getAllUsers(query: FilterQuery<IUser> = {}, options: QueryOptions = { lean: true }) {
    try {
        const users = await UserORM.find(query, { __v: false, password: false }, options);

        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function updateUser(query: FilterQuery<IUser>, update: UpdateQuery<IUser>) {
    try {
        const user = await UserORM.findOne(query);

        user?.set(update);
        await user?.save();

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function deleteUser(query: FilterQuery<IUser>) {
    try {
        return UserORM.findOneAndDelete(query);
    } catch (error: any) {
        throw new Error(error);
    }
}

export default { createUser, getUser, getAllUsers, updateUser, deleteUser };
