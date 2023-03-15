// FUNDAMENTAL JAVASCRIPT

// 1. Code Structure (statement, semicolon and comment)
console.log('Hello world');
alert('Hello world');

console.log('Hello world');
alert('Hello world');

// Ini adalah komentar 1 baris
/* Ini adalah komentar 
multi 
baris */

// 2. Variables (var, let, const)
var nama = 'Arkatama';
let id = 123;
const alamat = 'Malang';

// 3. Data Types (primitives, object)
// number
let n = 25;
// BigInt
const bigInt = 12345678901234568901234567890n;
// String
const nama1 = 'Arkatama';
const nama2 = 'Arkatama';
const nama3 = `Arkatama`;
// Boolean
let isLoggedIn = true;
let isAdmin = false;
// null
let girlFriend = null;
// undefined
let name;
console.log('name');
// symbol
let employee = Symbol('Joko');
console.log(employee); // output : Symbol(Joko)
console.log(employee.description); // output : Joko

// object
let employees = {
  name: 'John',
  age: 30,
  job: 'Web Developer',
  isMarried: false,
  hobies: ['Sports', 'Cooking'],
};

// 4. Type Conversion (string, boolean, and number)
value = String(value);

alert('6' / '2'); // 3, string are converted to numbers
let str = '123';
let num = Number(str);

alert(Boolean('hello')); // true
alert(Boolean('')); // false

// 5. Operators
// Aritmethic
let a = 10;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);

// assignment
a += 5;
a -= 5;
a *= 5;

// comparison
console.log((a = b));
console.log(a < b);
console.log(a > b);
console.log(a != b);

// logical
console.log(a && b);
console.log(a || b);
console.log(!a);

// bitwise
console.log(a & b);
console.log(a | b);
console.log(a ^ b);
console.log(~a);

// ternary
console.log((a = b ? 'yes' : 'no'));

// 6. Popup Modal (alert, confirm, and prompt)
alert('Selamat datang di Arkatama');
alert('Sekarang tanggal: ' + new Date());

let response = prompt('Apakah kamu mau nonton akhir pekan ini?');
alert('Jawabannya adalah ' + response);

let response2 = confirm('mau dinner malam ini?');
alert('Jawabannya: ' + response);

// 7. Conditionals (if, if-else, else if, and switch)
let response_if = prompt('1 + 1 = ');
if (response == 2) {
  alert('Correct!');
}

let response_if_else = prompt('1 + 1 = ');
if (response == 2) {
  alert('Correct!');
} else {
  alert('Wrong');
}

let response_elseIf = prompt('1 + 1 = ');
if (response == 2) {
  alert('Correct!');
} else if (response < 2) {
  alert('Too low');
} else {
  alert('Wrong');
}

let color = 'red';
switch (color) {
  case 'red':
    alert('I love red!');
    break;
  case 'blue':
    alert('I love blue!');
    break;

  default:
    alert("I don't know what color it is!");
    break;
}

// 8. Loops (for, do while, and while)
for (let i = 0; i < 5; i++) {
  console.log(`Iterasi ke ${i}`);
}

let doWhile = 0;
do {
  console.log(`Iterasi ke ${doWhile}`);
  doWhile++;
} while (doWhile < 5);

let whileLoop = 0;
while (whileLoop < 5) {
  console.log(`Iterasi ke ${whileLoop}`);
  whileLoop++;
}

// break and continue
for (let i = 0; i < 5; i++) {
  if (i == 3) {
    break;
  }
  console.log(`Iterasi ke ${i}`);
}

for (let i = 0; i < 5; i++) {
  if (i == 3) {
    continue;
  }
  console.log(`Iterasi ke ${i}`);
}

// 9. Functions (basic, expression, and arrow function)
function salam() {
  console.log('Hello World');
}
salam();

let salam = function () {
  console.log('Hello World');
};
salam();

var salam = () => {
  console.log('Hello World');
};
var salam2 = () => console.log('Hello World');
salam();
salam2();
