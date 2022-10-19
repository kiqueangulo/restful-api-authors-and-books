import mongoose from "mongoose";

import { IUser } from "../models/user.model";
import { IBook } from "../models/book.model";

async function addToList(user: IUser, book: IBook): Promise<boolean> {
    if (user.books.includes(book._id)) return false;

    user.books.push(book._id);
    user.save();

    if (book.users.includes(user._id)) return false;

    book.users.push(user._id);
    await book.save();

    return true;
}

export default { addToList };
