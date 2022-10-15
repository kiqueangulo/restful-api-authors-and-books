import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Book from '../models/Book';

const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author } = req.body;

        const book = new Book({ _id: new mongoose.Types.ObjectId(), title, author });

        await book.save();

        return res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const book = await Book.findById(bookId).populate('author').select('-__v');

        return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found.' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find().populate('author').select('-__v');

        return res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const book = await Book.findById(bookId);

        if (book) {
            book.set(req.body);

            await book.save();

            return res.status(201).json({ book });
        } else {
            res.status(404).json({ message: 'Not found.' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const deletedBook = await Book.findByIdAndDelete(bookId);

        return deletedBook ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found.' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createBook, readBook, readAllBooks, updateBook, deleteBook };
