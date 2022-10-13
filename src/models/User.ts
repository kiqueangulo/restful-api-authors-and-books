import mongoose, { Document, Schema, HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';

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

UserSchema.pre<HydratedDocument<IUserModel>>('save', async function (next) {
    const user = this as IUserModel;

    if (!user.isModified('password')) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    return next();
});

export default mongoose.model<IUserModel>('User', UserSchema);
