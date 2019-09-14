const express = require('express');
const app = express();

/** bring routes here */

const { getPosts } = require('./routes/post');

app.get("/", getPosts);

const port = 8080;
app.listen(port, () => {
    console.log(`A NodeJS API listening on port: ${port}`);
});