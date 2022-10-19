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

export interface IUserModel extends Omit<IUser, "passwordConfirmation">, Document {
    addBook(bookId: IBookModel["_id"]): Promise<void>;
}

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

userSchema.methods.addBook = async function (bookId: IBookModel["_id"]) {
    console.log("Before assigning the const user");

    const user = this as IUserModel;
    console.log("Before the bookId is there");

    if (user.books?.includes(bookId)) return;
    console.log("Before pushing the bookId");

    user.books.push(bookId);
    await user.save();

    return;
};

export default mongoose.model<IUserModel>("User", userSchema);
