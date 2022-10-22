import mongoose, { Document, Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

import { IBook } from "./book.model";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    books: Array<IBook["_id"]>;
    addBook(bookId: IBook["_id"]): Promise<void>;
    testMethod(): void;
}

const userSchema = new Schema<Omit<IUser, "passwordConfirmation">>(
    {
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
    },
    {
        methods: {
            async addBook(bookId: IBook["_id"]): Promise<void> {
                console.log("Before assigning the const user");

                const user = this;
                console.log("Before the bookId is there");

                if (user.books?.includes(bookId)) return;
                console.log("Before pushing the bookId");

                user.books.push(bookId);
                await user.save();

                return;
            },
            testMethod(): void {
                console.log("testMethod works");
            }
        }
    }
);

userSchema.pre<HydratedDocument<IUser>>("save", async function (next) {
    const user = this as IUser;

    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    return next();
});

export default mongoose.model<IUser>("User", userSchema);
