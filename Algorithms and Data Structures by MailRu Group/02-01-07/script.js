/*
Реализуйте дек с динамическим зацикленным буфером.
Для тестирования дека на вход подаются команды.
В первой строке количество команд. Затем в каждой строке записана одна команда.
Каждая команда задаётся как 2 целых числа: a b.
a = 1 - push front,
a = 2 - pop front,
a = 3 - push back,
a = 4 - pop back.

Если дана команда pop*, то число b - ожидаемое значение. Если команда pop вызвана для пустой структуры данных, то ожидается “-1”.


Требуется напечатать YES, если все ожидаемые значения совпали. Иначе, если хотя бы одно ожидание не оправдалось, то напечатать NO.

Sample Input:
5
1 44
3 50
2 44
2 50
2 -1
Sample Output:
YES
*/

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var lines = [];
var numOfCommands;

var commandsMap = {
  1: 'pushFront',
  2: 'popFront',
  3: 'pushBack',
  4: 'popBack'
}

function Deque() {
  var buffer = [];
  this.pushFront = function(data) {
    buffer.unshift(data);
  };
  this.pushBack = function(data) {
    buffer.push(data);
  };
  this.popFront = function() {
    return buffer.length? buffer.shift() : -1;
  };
  this.popBack = function() {
    return buffer.length ? buffer.pop() : -1;
  };
  this._getBuffer = function() { // debug only
    return buffer;
  }
};


function getAnswer() {
  var answer = true;
  var deque = new Deque();
  for(var i =0; i < lines.length; i++) {
    var lineArr = lines[i].split(' ').map((item) => +item);
    var operation = commandsMap[lineArr[0]];
    var param = lineArr[1];
    var ret = deque[operation](param);
    if(operation === 'popBack' || operation === 'popFront') {
      answer = (ret === param);
    }
    console.log(`${operation}(${param}) => [${deque._getBuffer().join(', ')}]`);
    if(!answer) {
      break;
    }
  }
  return answer;
}

rl.on('line', function(line) {
    if(numOfCommands === undefined) {
      numOfCommands = +line;
      return;
    }
    lines.push(line);
    console.log(`${numOfCommands} : ${lines.length}`);
    if(lines.length === numOfCommands) {
      return console.log(getAnswer() ? 'YES' : 'NO');
    }
});
