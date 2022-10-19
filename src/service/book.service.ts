import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import BookORM, { IBookModel } from "../models/book.model";

async function createBook(input: DocumentDefinition<Omit<IBookModel, "users" | "addUser">>) {
    return BookORM.create(input);
}

async function getBook(query: FilterQuery<IBookModel>, options: QueryOptions = { lean: true }) {
    return BookORM.findOne(query, { __v: false }, options).populate("author");
}

async function getAllBooks() {
    return BookORM.find().populate("author").select("-__v");
}

async function updateBook(query: FilterQuery<IBookModel>, update: UpdateQuery<IBookModel>, options: QueryOptions = { new: true }) {
    return BookORM.findOneAndUpdate(query, update, options);
}

async function deleteBook(query: FilterQuery<IBookModel>) {
    return BookORM.deleteOne(query);
}

export default { createBook, getBook, getAllBooks, updateBook, deleteBook };
