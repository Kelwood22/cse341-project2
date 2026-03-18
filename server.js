const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));
app.use('/', require('./routes/swagger'));

mongodb.initDb((err) => {
    if (err) {
        console.log('Unable to connect to database!');
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});