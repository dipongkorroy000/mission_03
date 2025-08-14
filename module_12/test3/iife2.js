//  IIFE function

let a = 10;

((name) => {
  let a = 10; // block scope
  console.log(`Learning ${name}`);
})("node");

console.log(global);
console.log(module);
console.log(__dirname);
console.log(__filename);
