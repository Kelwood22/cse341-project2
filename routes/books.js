const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const isAuthenticated = require('../middleware/authenticate');

console.log("BOOKS ROUTES LOADED WITH AUTH MIDDLEWARE");
console.log("BOOKS isAuthenticated:", isAuthenticated);

router.get('/',
    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'All books'
    #swagger.path = '/books'
    */
    booksController.getAllBooks
);

router.get('/:id',
    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Get book by ID'
    #swagger.path = '/books/{id}'
    */
    booksController.getBookById
);

router.post('/',
    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Create a new book'
    #swagger.path = '/books'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        authorId: { type: "string" },
                        genre: { type: "string" },
                        publishedYear: { type: "number" },
                        pageCount: { type: "number" },
                        rating: { type: "number" },
                        isbn: { type: "string" },
                        summary: { type: "string" }
                    }
                }
            }
        }
    }
    #swagger.security = [{ cookieAuth: [] }]
    */
    isAuthenticated, booksController.createBook
);

router.put('/:id',
    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Update an existing book'
    #swagger.path = '/books/{id}'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        authorId: { type: "string" },
                        genre: { type: "string" },
                        publishedYear: { type: "number" },
                        pageCount: { type: "number" },
                        rating: { type: "number" },
                        isbn: { type: "string" },
                        summary: { type: "string" }
                    }
                }
            }
        }
    }
    #swagger.security = [{ cookieAuth: [] }]
    */
    isAuthenticated, booksController.updateBook
);

router.delete('/:id',
    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Delete a book'
    #swagger.path = '/books/{id}'
    #swagger.security = [{ cookieAuth: [] }]
    */
    isAuthenticated, booksController.deleteBook
);

console.log('Books routes loaded');

module.exports = router;