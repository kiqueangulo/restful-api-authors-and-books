import mongoose, { Document, Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

import { IBook } from "./book.model";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    books: Array<IBook["_id"]>;
    addBook(bookId: IBook["_id"]): Promise<void>;
}

export type TUser =
    | (IUser & {
          _id: Schema.Types.ObjectId;
      })
    | null;

const userSchema = new Schema<Omit<IUser, "passwordConfirmation">>({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
});

userSchema.pre<HydratedDocument<IUser>>("save", async function (next) {
    const user = this as IUser;

    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    return next();
});

userSchema.methods.addBook = async function (bookId: IBook["_id"]) {
    console.log("Before assigning the const user");

    const user = this as IUser;
    console.log("Before the bookId is there");

    if (user.books?.includes(bookId)) return;
    console.log("Before pushing the bookId");

    user.books.push(bookId);
    await user.save();

    return;
};

export default mongoose.model<IUser>("User", userSchema);
