// console.log("PROCESS: ", process);
const { sum, multiply } = require('./helpers');
const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello World From NodeJS...");
});

server.listen(3000);

// var let const
const total = sum(5, 3);
const mul = multiply(5, 3);

console.log('Total: ' + total);
console.log('Mul: ' + mul);