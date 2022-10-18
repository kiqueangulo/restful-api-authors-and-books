import mongoose, { Document, Schema } from 'mongoose';

import { IUserModel } from './user.model';

export interface IBook {
    title: string;
    author: Array<string>;
    description: string;
    users: Array<IUserModel['_id']>;
}

export interface IBookModel extends IBook, Document {}

const bookSchema = new Schema<IBookModel>(
    {
        title: { type: String, require: true },
        author: [{ type: String, required: true }],
        description: { type: String, default: 'No description available at the moment.' },
        users: [{ type: Schema.Types.ObjectId, ref: 'User', unique: true }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBookModel>('Book', bookSchema);
