/*
 Дана последовательность целых чисел a[0..n-1] и натуральное число k, такое что для любых i, j: если j >= i + k, то a[i] <= a[j]. Требуется отсортировать последовательность. Последовательность может быть очень длинной. Время работы O(n * log(k)). Доп. память O(k).

 Использовать слияние.

 Sample Input:
 20
 3 4 1 2 0 9 7 8 6 5 11 12 13 10 14 18 19 16 17 15
 10
 Sample Output:
 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
 */

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var sizeForSubarrays;
var lines = [];

var knownTests = [];

function merge(arrays) {
    var out = [];
    while(arrays.length) {
        var minValues = arrays.map((arr) => arr[0]);
        var minValue = Math.min.apply(Math, minValues);
        var arr = arrays.find((item) => item[0] === minValue);
        arr.shift();
        out.push(minValue);
        if(!arr.length) {
            var index = arrays.indexOf(arr);
            if (index > -1) {
                arrays.splice(index, 1);
            }
        }
    }
    return out;
}

function getAnswer() {
    var arr = lines[0].split(' ').map((item) => +item);
    var listOfSubarrays = [];

    var s = [];
    listOfSubarrays.push(s);
    while(arr.length) {
        if(s.length === sizeForSubarrays) {
            s = [];
            listOfSubarrays.push(s);
        }
        s.push(arr.shift());
    }
    listOfSubarrays.forEach((subArray) => subArray.sort((a, b) => (a > b) ? 1 : (a < b)? -1 : 0));
    return merge(listOfSubarrays).join(' ');
}

rl.on('line', function(line) {
    if (!sizeForSubarrays) {
        return sizeForSubarrays = +line;
    }

    lines.push(line);
    if (lines.length === 1) {
        //var testData = `${numOfLines}|${lines.join('|')}`;
        //if(knownTests.indexOf(testData) < 0) {
        // throw testData;
        //}
        return console.log(getAnswer());
    }
});
