import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
    title: string;
    author: Schema.Types.ObjectId;
}

export interface IBookModel extends IBook, Document {}

const bookSchema = new Schema<IBookModel>(
    {
        title: { type: String, require: true },
        author: { type: Schema.Types.ObjectId, require: true, ref: 'Author' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBookModel>('Book', bookSchema);
