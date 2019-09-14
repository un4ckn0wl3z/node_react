const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

// db

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected!'));
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ! ${err.message}`);
});

/** bring routes here */

const postRoutes = require('./routes/post');

// middlware 
app.use(morgan('dev'));

app.use("/", postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`A NodeJS API listening on port: ${port}`);
});