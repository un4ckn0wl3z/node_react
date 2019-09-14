const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// db

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'));
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ! ${err.message}`);
});

/** bring routes here */

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');


// middlware 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/posts", postRoutes);
app.use("/auth", authRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`A NodeJS API listening on port: ${port}`);
});