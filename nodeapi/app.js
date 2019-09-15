const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
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
const userRoutes = require('./routes/user');

/** api docs */
app.get('/', (req, res) => {
    fs.readFile('./docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).send({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            error: 'Unauthorized.'
        });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`A NodeJS API listening on port: ${port}`);
});