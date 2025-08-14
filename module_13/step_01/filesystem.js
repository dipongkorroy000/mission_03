// 1. synchronous
// file read /I/O intensive -> single thread -> not go thread pool ->

// 2. asynchronous
// file read -> single thread -> event loop -> thread pool -> task compilation

const fs = require("fs");

console.log('task 1');

const text = 'Learning File System';
fs.writeFileSync('./textfile.txt', text)


console.log('task 3')


const data = fs.readFileSync("./textfile.txt", { encoding: 'utf-8' });
console.log(data)



console.log('task 4')