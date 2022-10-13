import mongoose, { Document, Schema } from 'mongoose';

import { IBookModel } from './Book';

export interface IUser {
    username: string;
    email: string;
    password: string;
    books: Array<IBookModel['_id']>;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

export default mongoose.model<IUserModel>('User', UserSchema);
