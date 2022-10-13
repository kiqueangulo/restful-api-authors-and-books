import mongoose, { Document, Schema } from 'mongoose';

import { IBookModel } from './Book';

export interface IUser {
    name: string;
    email: string;
    password: string;
    books: Array<IBookModel['_id']>;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

export default mongoose.model<IUserModel>('User', UserSchema);
