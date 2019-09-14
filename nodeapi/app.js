const express = require('express');
const app = express();
const morgan = require('morgan');

/** bring routes here */

const postRoutes = require('./routes/post');

// middlware 
app.use(morgan('dev'));

app.use("/", postRoutes);

const port = 8080;
app.listen(port, () => {
    console.log(`A NodeJS API listening on port: ${port}`);
});