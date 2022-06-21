const obj1 = {
  name: "John",
  age: 22,
  num: Math.floor(Math.random() * 100),
  greet: function () {
    return `Hi, i am ${this.name} and i am ${this.age} years old`;
  },
};

const fruits = [
  { name: "Apple", quantity: 10 },
  { name: "Orange", quantity: 5 },
  { name: "Mango", quantity: 15 },
];

function person(name, age) {
  this.name = name;
  this.age = age;
  this.introduction = `${this.name}, ${this.age}`;
}

// ----------------------------- call() ------------------------------------------------

function welcome(job) {
  //   this.setTimeout(() => {
  //     console.log("this...", this);
  //   }, 2000);
  console.log("this...", this);
  return `Wonderful !! ${this.name}, you are an ${job}`;
}

// so basically, obj1 is a different object and the method welcome() is a different object.
// i am calling welocme in obj1 context, therfore this.name has its value
let result = welcome.call(obj1, "enginner");
console.log(result);

function male(name, age) {
  person.call(this, name, age);
}

function female(name, age) {
  person.call(this, name, age);
}

const m1 = new male("Abhishek", 25);
const fe1 = new female("Purnima", 53);

console.log(m1.introduction, fe1.introduction);

for (let i = 0; i < fruits.length; i++) {
  (function (i) {
    this.description = function () {
      return `position : ${i},${this.name}, ${this.quantity}`;
    };

    const result = this.description();
    console.log(result);
  }.call(fruits[i], i));
}

// ----------------------------- apply() ------------------------------------------------

// apply is similar to call() method but here we pass the arguments in the array to the apply method
function add(num1, num2, num3) {
  return this.num + num1 + num2 + num3;
}

let result_2 = add.apply(obj1, [100, 200, 300]);
console.log(result_2);

const numbers = Array.from({ length: 5 }, () =>
  Math.floor(Math.random() * 100)
);
const more_numbers = [200, 300, 400];
numbers.push.apply(numbers, more_numbers);

console.log("Same old array got bigger", numbers);


// Use Apply() to Chain Object Constructors
function other (details) {
    person.apply(this, details);
}

console.log(new other(['some transgender', 12]).introduction);

// ----------------------------- bind() ------------------------------------------------

// The bind() method is reminiscent of call() and apply(). But instead of executing a function immediately, bind() returns a function that can be executed later on.

function multiply(value) {
  return this.num * value;
}

const func = multiply.bind(obj1, 100);
console.log(func());

// Use Bind() to Make SetTimeout Work

const f = obj1.greet.bind(obj1);
global.setTimeout(() => {
    console.log(f())
}, 1000);

// -------------------------------- Colclusion -------------------------------

// The call() and apply() are very similar methods. They both execute the bound function on the object immediately.
// The bind() method does not execute the function right away. Instead, it creates and returns a bound function that can be executed later.