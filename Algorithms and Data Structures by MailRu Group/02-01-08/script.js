/*
Дан фрагмент последовательности скобок, состоящей из символов (){}[].
Требуется определить, возможно ли продолжить фрагмент в обе стороны, получив корректную последовательность.
Если возможно - выведите минимальную корректную последовательность, иначе - напечатайте "IMPOSSIBLE".
Максимальная длина строки 10^6 символов.

Sample Input 1:
}[[([{[]}
Sample Output 1:
{}[[([{[]}])]]

Sample Input 2:
{][[[[{}[]
Sample Output 2:
IMPOSSIBLE
*/

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var closingBracketPairs = {
  ')': '(',
  ']': '[',
  '}': '{'
};

var openingBracketPairs = {
  '(': ')',
  '[': ']',
  '{': '}'
};

function Stack() {
  var buffer = [];
  this.push = function(data) {
    buffer.push(data);
  };
  this.pop = function() {
    return buffer.length? buffer.pop() : -1;
  };
  this.isEmpty = function() {
    return buffer.length === 0;
  }
  this._getBuffer = function() { // debug only
    return buffer;
  };
};

function getAnswer(line) {
  var posible = true;
  var closingStack = new Stack();
  var openingStack= new Stack();
  var ret = '';
  for(var i = 0; i< line.length; i++) {
    var currentSymbol = line[i];
    if (currentSymbol in openingBracketPairs) {
      openingStack.push( currentSymbol )
    }

    if (currentSymbol in closingBracketPairs) {
      if(openingStack.isEmpty()) {
        closingStack.push(currentSymbol);
      } else {
        if(openingStack.pop() !== closingBracketPairs[currentSymbol]) {
          posible = false;
          break;
        }
      }
    }
  }

  if(posible){
    while(!closingStack.isEmpty()) {
      ret += closingBracketPairs[closingStack.pop()];
    }
    ret += line;
    while(!openingStack.isEmpty()){
      ret += openingBracketPairs[openingStack.pop()];
    }
  }
  else{
    ret = 'IMPOSSIBLE';
  }
  return ret;
}

rl.on('line', function(line) {
  var answer = getAnswer(line);
  //console.log(`getAnswer("${line}") = ${answer}`);
  return console.log(answer);
});
