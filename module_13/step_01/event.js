const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on("ring", () => {
  console.log("Yahoo!class sesh!");
});

schoolBell.on("ring", () => {
  console.log("Sheet, More Class");
});

schoolBell.on("broken", () => {
  console.log("Oh no! Broken the Bell");
});

schoolBell.emit("ring");
schoolBell.emit("broken");

