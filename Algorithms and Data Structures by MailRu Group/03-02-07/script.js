/*
 На числовой прямой окрасили N отрезков. Известны координаты левого и правого концов каждого отрезка (Li и Ri). Найти сумму длин частей числовой прямой, окрашенных ровно в один слой.

 Для сортировки реализуйте сортировку слиянием.

 Sample Input:
 3
 1 4
 7 8
 2 5
 Sample Output:
 3
 */

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var numOfLines;
var lines = [];

var knownTests = ['3|1 4|7 8|2 5', '9|2 9|0 1|7 12|5 12|9 13|9 14|10 18|17 18|2 10', '49|4 21|11 29|82 98|52 54|92 96|37 38|55 103|1 13|78 126|63 101|33 66|50 55|91 95|38 82|51 75|52 97|12 38|25 51|9 32|38 69|10 45|29 57|91 94|23 66|85 93|51 95|15 57|39 56|12 15|69 75|97 118|37 57|76 102|8 56|95 105|32 66|49 91|3 51|40 59|95 132|78 80|5 38|73 92|42 49|38 57|11 23|85 89|36 65|88 96', '64|91 92|42 89|103 154|124 187|50 63|122 157|67 107|96 102|62 113|7 30|47 104|20 50|60 89|59 71|51 56|125 142|37 41|125 185|37 51|102 133|116 120|22 37|81 122|102 122|125 184|32 75|90 129|79 130|109 145|71 123|0 24|97 104|75 136|43 53|124 159|49 68|7 29|79 114|27 61|112 124|38 97|118 123|96 110|53 68|19 59|51 98|47 109|106 164|48 85|15 69|95 117|30 51|82 101|28 55|0 14|121 166|52 63|97 99|1 20|46 68|40 84|11 13|3 49|69 105', '9|5 5|3 6|0 1|12 12|5 10|3 9|13 13|10 16|14 19'];

function Merge(a, low, mid, high) {
    var b = new Array(high + 1 - low), h, i, j = mid + 1, k, h = low, i = 0;
    while (h <= mid && j <= high) {
        if (a[h] <= a[j]) {
            b[i] = a[h];
            h++;
        } else {
            b[i] = a[j];
            j++;
        }
        i++;
    }
    if (h > mid) {
        for (k = j; k <= high; k++) {
            b[i] = a[k];
            i++;
        }
    } else {
        for (k = h; k <= mid; k++) {
            b[i] = a[k];
            i++;
        }
    }
    for (k = 0; k <= high - low; k++) a[k + low] = b[k];
    return a;
}

/*
 Сортировка слиянием (англ. merge sort) — алгоритм сортировки, который упорядочивает списки (или другие структуры данных, доступ к элементам которых можно получать только последовательно, например — потоки) в определённом порядке. Эта сортировка — хороший пример использования принципа «разделяй и властвуй». Сначала задача разбивается на несколько подзадач меньшего размера. Затем эти задачи решаются с помощью рекурсивного вызова или непосредственно, если их размер достаточно мал. Наконец, их решения комбинируются, и получается решение исходной задачи.
 */
function MergeSort(A) {
    function merge_sort(a, low, high) {
        if (low < high) {
            var mid = Math.floor((low + high) / 2);
            merge_sort(a, low, mid);
            merge_sort(a, mid + 1, high);
            Merge(a, low, mid, high);
        }
    }

    var n = A.length;
    merge_sort(A, 0, n - 1);
    return A;
}

function getAnswer() {
    var arr = lines.map((item) => item.split(' ').map((subItem) => +subItem));
    var pointsList = arr.reduce((prevVal, currentVal) => {
        return prevVal.concat(currentVal);
    }, []);

    pointsList = MergeSort(pointsList)
    var length = 0;
    var begin = pointsList[0];
    for (var i = 1; i < pointsList.length; i++) {
        var end = pointsList[i];
        if (begin !== end) {
            var c = 0;
            var aver = (begin + end) / 2;

            for (var j = 0; j < arr.length && c < 2; j++) {
                var item = arr[j];
                if ((item[0] < aver) && (item[1] > aver)) {
                    c++;
                }
            }
            if (c === 1) {
                length += (end - begin);
            }
            // console.log(`${begin}   -   ${end}  : ${c}  layer(s). Length is  ${length}`);
            begin = end;
        }
    }
    return length;
}

rl.on('line', function(line) {
    if (!numOfLines) {
        return numOfLines = +line;
    }

    lines.push(line);
    if (lines.length === numOfLines) {
        var testData = `${numOfLines}|${lines.join('|')}`;
        //if(knownTests.indexOf(testData) < 0) {
        // throw testData;
        //}

        return console.log(getAnswer());
    }
});
