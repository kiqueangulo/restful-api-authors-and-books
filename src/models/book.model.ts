import mongoose, { Document, Schema } from "mongoose";

import { IUser } from "./user.model";

export interface IBook extends Document {
    title: string;
    author: Array<string>;
    description: string;
    users: Array<IUser["_id"]>;
    addUser(userId: IUser["_id"]): Promise<void>;
}

// export interface IBookModel extends IBook, Document {
//     addUser: (userId: IUser["_id"]) => Promise<void>;
// }

const bookSchema = new Schema<IBook>(
    {
        title: { type: String, require: true },
        author: [{ type: String, required: true }],
        description: { type: String, default: "No description available at the moment." },
        users: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }]
    },
    {
        timestamps: true
    }
);

bookSchema.methods.addUser = async function (userId: IUser["_id"]) {
    const book = this as IBook;

    if (book.users?.includes(userId)) return;

    book.users.push(userId);
    await book.save();

    return;
};

export default mongoose.model<IBook>("Book", bookSchema);
