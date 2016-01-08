/*
 Реализуйте сортировку вставками массива целых чисел.

 Количество чисел в массиве определяется окончанием стандартного потока ввода и заранее не известно.

 Sample Input:
 3 1 2
 Sample Output:
 1 2 3
 */

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var lines = [];

/*
 Сортировка вставками (англ. Insertion sort) — алгоритм сортировки, в котором элементы входной последовательности просматриваются по одному,
 и каждый новый поступивший элемент размещается в подходящее место среди ранее упорядоченных элементов[1].

 Вычислительная сложность - O(n^2).
 */
function insertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var tmp = arr[i];
    for (var j = i - 1; j >= 0 && tmp < arr[j]; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = tmp;
  }
  return arr;
}

function getAnswer(line) {
  return insertionSort(line.split(' ').map((item) => +item)).join(' ');
}

rl.on('line', function(line) {
  return console.log(getAnswer(line));
});
