const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const books = await db.collection('books').find().toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
};

const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const db = mongodb.getDatabase();
        const book = await db.collection('books').findOne({ _id: new ObjectId(bookId) });

        if (!book) {
            res.status(404).json({ error: 'Book not found.' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the book.' });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, authorId, genre, publishedYear, pageCount, rating, isbn, summary } = req.body;
        const db = mongodb.getDatabase();
        const result = await db.collection('books').insertOne({
            title,
            authorId,
            genre,
            publishedYear,
            pageCount,
            rating,
            isbn,
            summary
        });

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ message: 'Book created successfully', bookId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the book.' });
    }
};

const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { title, authorId, genre, publishedYear, pageCount, rating, isbn, summary } = req.body;
        const db = mongodb.getDatabase();
        const result = await db.collection('books').updateOne(
            { _id: new ObjectId(bookId) },
            {
                $set: {
                    title,
                    authorId,
                    genre,
                    publishedYear,
                    pageCount,
                    rating,
                    isbn,
                    summary
                }
            }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Book not found.' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Book updated successfully', updateBook: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const db = mongodb.getDatabase();
        const result = await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });

        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Book not found.' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the book.' });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};