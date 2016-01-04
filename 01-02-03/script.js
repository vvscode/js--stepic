/*
Даны два массива целых чисел одинаковой длины A[0..n−1] и B[0..n−1].
Необходимо найти первую пару индексов i0 и j0, i0≤j0, такую что A[i0]+B[j0]=max{A[i]+B[j],где0≤i<n,0≤j<n,i≤j}.
Время работы – O(n).
Ограничения: 1≤n≤100000,0≤A[i]≤100000,0≤B[i]≤100000  для любого i.
Sample Input:
4
4 -8 6 0
-10 3 1 1
Sample Output:
0 1
*/

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var lines = [];

var convertToMax = function(arr) {
  var prevMaxVal;
  var prevIndex;
  return arr.map((item, index, arr) => {
    var maxVal = !!index ? Math.max(item, prevMaxVal) : item;
    var indexForMaxVal;
    if(maxVal === prevMaxVal) {
      indexForMaxVal = prevIndex;
    } else {
      indexForMaxVal = prevIndex = index;
    }
    prevMaxVal = maxVal;

    return {
      maxVal: maxVal,
      indexForMaxVal: indexForMaxVal
    }
  });
};

function getAnswer() {
  var arr1WithMaxValues = convertToMax(lines[1].split(' ').map((item) => +item));
  var arr2 = lines[2].split(' ').map((item) => +item);
  var maxSum = arr1WithMaxValues[0].maxVal + arr2[0];
  var maxSumIndex1 = 0;
  var maxSumIndex2 = 0;
  for(var index2 = 0; index2 < arr2.length; index2++) {
    var item2 = arr2[index2];

    var item1 = arr1WithMaxValues[index2].maxVal;
    var index1 = arr1WithMaxValues[index2].indexForMaxVal;

    var sum = item1 + item2;
    if(sum > maxSum) {
      maxSum = sum;
      maxSumIndex1 = index1;
      maxSumIndex2 = index2;
    }
  }

  console.log(`${maxSumIndex1} ${maxSumIndex2}`);
}

rl.on('line', function(line) {
    lines.push(line);
    if(lines.length === 3) {
      return getAnswer();
    }
});
