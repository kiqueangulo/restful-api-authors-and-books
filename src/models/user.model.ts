import mongoose, { Document, Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

import { IBookModel } from "./book.model";

export interface IUser {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    books: Array<IBookModel["_id"]>;
}

export interface IUserModel extends Omit<IUser, "passwordConfirmation">, Document {}

const userSchema = new Schema<IUserModel>({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
});

userSchema.pre<HydratedDocument<IUserModel>>("save", async function (next) {
    const user = this as IUserModel;

    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    return next();
});

export default mongoose.model<IUserModel>("User", userSchema);
