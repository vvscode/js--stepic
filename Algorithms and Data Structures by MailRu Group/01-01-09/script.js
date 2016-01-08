/*
Выведите разложение натурального числа n > 1 на простые множители. Простые множители должны быть упорядочены по возрастанию и разделены пробелами.
*/
function getPrimeMultipliers(number) {
  number = +number;
  if(number <= 3) {
    return [number];
  }
  const multipliers = [];
  const numberSqrt = Math.sqrt(number);
  for(var i = 2; i<= numberSqrt; i++){
    if(number % i === 0) {
      var getNextMultipliers = getPrimeMultipliers(number / i);
      multipliers.push(i);
      multipliers = multipliers.concat(getNextMultipliers);
      break;
    }
  }
  if(!multipliers.length) {
    multipliers.push(number);
  }
  multipliers.sort(function(a, b) {
    return a > b; // this one for fixing string-sorting at js ( for input = 132 for example )
  });
  return multipliers;
}

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', function(line) {
    var number = +line;
    console.log(`${getPrimeMultipliers(number).join(' ')} `);// fix output format
}); // javascript
