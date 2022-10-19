import { Request, Response } from "express";

import service from "../service/user.service";
import bookService from "../service/book.service";

const createUserHandler = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const user = await service.createUser({ username, email, password });

        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await service.getUser({ _id: req.params.userId });

        return user ? res.status(200).json({ user }) : res.status(404).json({ message: "Not found." });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await service.getAllUsers();

        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await service.getUser({ _id: req.params.userId });

        if (!user) return res.status(404).json({ message: "Not found." });

        const userUpdated = await service.updateUser(user._id, req.body);

        return res.status(201).json({ userUpdated });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const userDeleted = await service.deleteUser({ _id: req.params.userId });

        return userDeleted ? res.status(201).json({ message: "Deleted" }) : res.status(404).json({ message: "Not found." });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const addBookHandler = async (req: Request, res: Response) => {
    try {
        const user = await service.getUser({ _id: req.params.userId });
        console.log("This is the user: ", user);

        if (!user) return res.status(404).json({ message: "Not found." });

        const book = await bookService.getBook({ _id: req.params.bookId });
        console.log("This is the book: ", book);

        if (!book) return res.status(404).json({ message: "Not found." });
        console.log("Before adding the book to the user");

        user.addBook(book._id);
        console.log("After adding the book to the user");

        book.addUser(user._id);

        // return res.status(201).redirect(308, `/${req.params.bookId}`)
        return res.status(201).send({ user, book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};

export default { createUserHandler, getUserHandler, getAllUsersHandler, updateUserHandler, deleteUserHandler, addBookHandler };
