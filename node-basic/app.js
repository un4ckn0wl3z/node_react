// console.log("PROCESS: ", process);
const { sum, multiply } = require('./helpers');
const http = require('http');

// var let const
const total = sum(5, 3);
const mul = multiply(5, 3);

console.log('Total: ' + total);
console.log('Mul: ' + mul);