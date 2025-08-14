// 2. asynchronous
// file read -> single thread -> event loop -> thread pool -> task compilation

const fs = require("fs");

// fs.readFile("./textfile3.txt", { encoding: "utf-8" }, (err, data) => {
//   if (err) {
//     console.log("Something went wrong", err);
//     return;
//   }

//   fs.writeFile("./textfile4.txt", data, { encoding: "utf-8" }, (err) => {
//     if (err) {
//       console.log("Something went wrong", err);
//       return;
//     }

//     console.log("Written successful");
//   });
// });

const readstream = fs.createReadStream("./textfile3.txt", { encoding: "utf-8" });
const writeStream = fs.createWriteStream("./textfile4.txt", { encoding: "utf-8" });

readstream.on("data", (data) => {
  console.log(data);

  writeStream.write(data, (err) => {
    if (err) {
      throw Error("Error", err);
    }
  });
});

readstream.on("error", (err) => {
  if (err) {
    throw Error("Error", err);
  }
});

writeStream.on("error", (err) => {
  if (err) {
    throw Error("Error", err);
  }
});

readstream.on("end", () => {
  console.log("reading ended");

  writeStream.end();
});

writeStream.on("finish", () => {
  console.log("writer successfully");
});
