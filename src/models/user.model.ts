import mongoose, { Document, Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

import { IBook } from "./book.model";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    books: Array<IBook["_id"]>;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});

userSchema.pre<HydratedDocument<IUser>>("save", async function (next) {
    const user = this as IUser;

    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    return next();
});

export default mongoose.model<IUser>("User", userSchema);
