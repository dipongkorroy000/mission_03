// 2. asynchronous
// file read -> single thread -> event loop -> thread pool -> task compilation

const fs = require("fs");

console.log("Task 1");

let text = "node js";
fs.writeFile("./textfile2.txt", text, { encoding: "utf-8" }, (err) => {
  if (err) {
    console.log("Something went wrong", err);
    return;
  }

  console.log("Written successful");
});

fs.readFile("./textfile2.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("Something went wrong", err);
    return;
  }

  console.log(data);
});

console.log("task 4");
