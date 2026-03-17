const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const authors = await db.collection('authors').find().toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching authors.' });
    }
};

const getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id;
        const db = mongodb.getDatabase();
        const author = await db.collection('authors').findOne({ _id: new ObjectId(authorId) });

        if (!author) {
            res.status(404).json({ error: 'Author not found.' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the author.' });
    }
};

const createAuthor = async (req, res) => {
    try {
        const { name, birthYear, nationality, bio } = req.body;
        const db = mongodb.getDatabase();
        const result = await db.collection('authors').insertOne({
            name,
            birthYear,
            nationality,
            bio
        });

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ message: 'Author created successfully', authorId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the author.' });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const { name, birthYear, nationality, bio } = req.body;
        const db = mongodb.getDatabase();
        const result = await db.collection('authors').updateOne(
            { _id: new ObjectId(authorId) },
            {
                $set: {
                    name,
                    birthYear,
                    nationality,
                    bio
                }
            }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Author not found.' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Author updated successfully', updatedAuthor: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the author.' });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const db = mongodb.getDatabase();
        const result = await db.collection('authors').deleteOne({ _id: new ObjectId(authorId) });

        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Author not found.' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the author.' });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};