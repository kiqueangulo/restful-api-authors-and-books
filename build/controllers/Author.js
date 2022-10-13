"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Author_1 = __importDefault(require("../models/Author"));
const createAuthor = (req, res) => {
    const { name } = req.body;
    const author = new Author_1.default({ _id: new mongoose_1.default.Types.ObjectId(), name: name });
    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};
const readAuthor = (req, res) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found.' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllAuthors = (req, res) => {
    return Author_1.default.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.status(500).json({ error }));
};
const updateAuthor = (req, res) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.status(201).json({ author }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found.' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteAuthor = (req, res) => {
    const authorId = req.params.authorId;
    return Author_1.default.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found.' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createAuthor, readAuthor, readAllAuthors, updateAuthor, deleteAuthor };