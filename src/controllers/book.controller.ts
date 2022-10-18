import { Request, Response } from 'express';

import service from '../service/book.service';

const createBookHandler = async (req: Request, res: Response) => {
    try {
        const { title, author, description } = req.body;

        const book = await service.createBook({ title, author, description });

        return res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getBookHandler = async (req: Request, res: Response) => {
    try {
        const book = await service.getBook({ _id: req.params.bookId });

        return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found.' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getAllBooksHandler = async (req: Request, res: Response) => {
    try {
        const books = await service.getAllBooks();

        return res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateBookHandler = async (req: Request, res: Response) => {
    try {
        const book = await service.getBook({ _id: req.params.bookId });

        if (!book) return res.status(404).json({ message: 'Not found.' });

        const bookUpdated = await service.updateBook(book._id, req.body);

        return res.status(201).json({ bookUpdated });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteBookHandler = async (req: Request, res: Response) => {
    try {
        const deletedBook = await service.deleteBook({ _id: req.params.bookId });

        return deletedBook ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found.' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createBookHandler, getBookHandler, getAllBooksHandler, updateBookHandler, deleteBookHandler };
