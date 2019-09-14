// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello From Express....');
// });

// app.listen(3000);

const fs = require('fs')
const fileName = "target.txt";

// fs.watch(fileName, () => {
//     console.log('File changed!');
// });

// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data.toString());

// });

const data = fs.readFileSync(fileName);
console.log(data.toString());
console.log('NodeJS Async Program.');