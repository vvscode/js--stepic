/*
Дан отсортированный массив различных целых чисел A[0..n-1] и массив целых чисел B[0..m-1].
Для каждого элемента массива B[i] найдите минимальный индекс элемента массива A[k],
ближайшего по значению к B[i].
Время работы поиска для каждого элемента B[i]: O(log(k)).
Подсказка. Обратите внимание, что время работы должно зависеть от индекса ответа - k. Для достижения такой асимптотики предлагается для начала найти отрезок вида [2p,2p+1] , содержащий искомую точку, а уже затем на нём выполнять традиционный бин. поиск.
Sample Input:
3
10 20 30
3
9 15 35
Sample Output:
0 0 2
*/

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var lines = [];

function findIndexForNearestValue(value, array) {
  var firstIndexForLargerVal = lastIndexForLowerVal = 0;
  var largerVal = lowerVal = array[0];
  for(var i = 0; i< array.length; i++) {
    if(array[i] > value) {
      firstIndexForLargerVal = i;
      largerVal = array[i];
      break;
    }
  }
  if(i === array.length) { // if can't found no value large than input
    return array.length - 1;
  }
  if(firstIndexForLargerVal === 0) { // if first item larger than input
    return 0;
  }
  lastIndexForLowerVal = firstIndexForLargerVal - 1;
  lowerVal = array[lastIndexForLowerVal];
  if(Math.abs(value - lowerVal) <= Math.abs(value - largerVal)) {
    return lastIndexForLowerVal;
  }
  return firstIndexForLargerVal
}

function getAnswer() {
  var arr1 = lines[1].split(' ').map((item) => +item);
  var arr2 = lines[3].split(' ').map((item) => +item);
  var ret = [];
  for(var i = 0; i < arr2.length; i++) {
    ret.push(findIndexForNearestValue(arr2[i], arr1));
  }

  console.log(`${ret.join(' ')}`);
}

rl.on('line', function(line) {
    lines.push(line);
    if(lines.length === 4) {
      return getAnswer();
    }
});
