// const {a, b, add}= require("./file_2");
import { a, b } from "./file_2.mjs";
import Add from "./file_2.mjs";

// const {a : a3, b : b3, add : add3}= require("./file_3");
import { a as a3, b as b3, add as add3} from "./file_3.mjs";

console.log(a);
console.log(b)
console.log(Add(3, 2));

// console.log(a3);
// console.log(b3)
// console.log(add3(3, 2));