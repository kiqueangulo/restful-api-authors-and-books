import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import BookORM, { IBook } from "../models/book.model";

async function createBook(input: DocumentDefinition<Omit<IBook, "users" | "addUser">>) {
    return BookORM.create(input);
}

async function getBook(query: FilterQuery<IBook>, options: QueryOptions = { lean: true }) {
    return BookORM.findOne(query, { __v: false }, options).populate("author");
}

async function getAllBooks() {
    return BookORM.find().populate("author").select("-__v");
}

async function updateBook(query: FilterQuery<IBook>, update: UpdateQuery<IBook>, options: QueryOptions = { new: true }) {
    return BookORM.findOneAndUpdate(query, update, options);
}

async function deleteBook(query: FilterQuery<IBook>) {
    return BookORM.deleteOne(query);
}

export default { createBook, getBook, getAllBooks, updateBook, deleteBook };
