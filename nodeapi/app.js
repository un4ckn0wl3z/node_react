const express = require('express');
const app = express();
const morgan = require('morgan');

/** bring routes here */

const { getPosts } = require('./routes/post');

// middlware 
app.use(morgan('dev'));


app.get("/", getPosts);

const port = 8080;
app.listen(port, () => {
    console.log(`A NodeJS API listening on port: ${port}`);
});