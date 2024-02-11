// console.log(arguments);
// console.log(require('module').wrapper);

const C = require('./test-module1');

const calc1 = new C();

console.log(calc1.add(1, 2));

//

const { add, multiply, devide } = require('./test-module2');

console.log(add(6, 3));

// caching

require('./test-module3')();
require('./test-module3')();
require('./test-module3')();
