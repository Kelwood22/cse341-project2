const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const isAuthenticated = require('../middleware/authenticate');

console.log("AUTHORS ROUTES LOADED WITH AUTH MIDDLEWARE");
console.log("AUTHORS isAuthenticated:", isAuthenticated);

router.get('/',
    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'All authors'
    #swagger.path = '/authors'
    */
    authorsController.getAllAuthors
);

router.get('/:id',
    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Get author by ID'
    #swagger.path = '/authors/{id}'
    */
    authorsController.getAuthorById
);

router.post('/',
    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Create a new author'
    #swagger.path = '/authors'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        birthYear: { type: "number" },
                        nationality: { type: "string" },
                        bio: { type: "string" }
                    }
                }
            }
        }
    }
    #swagger.security = [{ cookieAuth: [] }]
    */
    isAuthenticated, authorsController.createAuthor
);

router.put('/:id',
    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Update an existing author'
    #swagger.path = '/authors/{id}'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        birthYear: { type: "number" },
                        nationality: { type: "string" },
                        bio: { type: "string" }
                    }
                }
            }
        }   
    }
    #swagger.security = [{ cookieAuth: [] }]
    */
    isAuthenticated, authorsController.updateAuthor
);

router.delete('/:id',
    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Delete an author'
    #swagger.path = '/authors/{id}'
    #swagger.security = [{ cookieAuth: [] }]
    */
    isAuthenticated, authorsController.deleteAuthor
);

module.exports = router;