import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import Book, { IBookModel } from '../models/Book';

async function createBook(input: DocumentDefinition<IBookModel>) {
    return Book.create(input);
}

async function getBook(query: FilterQuery<IBookModel>, options: QueryOptions = { lean: true }) {
    return Book.findOne(query, { __v: false }, options).populate('author');
}

async function getAllBooks() {
    return Book.find().populate('author').select('-__v');
}

async function updateBook(query: FilterQuery<IBookModel>, update: UpdateQuery<IBookModel>, options: QueryOptions = { new: true }) {
    return Book.findOneAndUpdate(query, update, options);
}

async function deleteBook(query: FilterQuery<IBookModel>) {
    return Book.deleteOne(query);
}

export default { createBook, getBook, getAllBooks, updateBook, deleteBook };
