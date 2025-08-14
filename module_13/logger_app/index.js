// console.log(process)
// console.log(process.argv);

const inputArguments = process.argv.slice(2);
// console.log(inputArguments);
const text = inputArguments.join(" ");
// console.log(text);

const timestamp = new Date().toISOString();

// text.concat("\n") alternative ---
const message = `${text} ${timestamp} \n`;

if (!message) {
  console.log("❌ please provide a message a loge");
  console.log("Example : node index.js Hello world!!");
}

const path = require("path");
const filePath = path.join(__dirname, "log.txt");

const fs = require("fs");
fs.appendFile(filePath, message, { encoding: "utf-8" }, () => {
  console.log("Your log added successfully");
});

console.log(filePath);
