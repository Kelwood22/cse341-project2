const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    disableLogs: false,
    autoBody: false
});

// Load the server so routes are registered
let app;
try {
    app = require('./server'); 
} catch (err) {
    console.log('Server loaded for Swagger generation');
}

const doc = {
    info: {
        title: 'Books API',
        description: 'Books API documentation',
    },
    servers: [
        { url: "http://localhost:3000" },
        { url: "https://cse341-project2-rc8h.onrender.com" }
    ],

    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'connect.sid',
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/authors.js', './routes/books.js'];

console.log('Generating Swagger ...');

swaggerAutogen(outputFile, endpointsFiles, doc);