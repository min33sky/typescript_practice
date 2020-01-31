"use strict";
var table = document.createElement('table');
var rows = [];
var cells = [];
var turn = 'X';
var result = document.createElement('div');
var count = 0;
// 초기화
function init() {
    turn = 'X';
    cells.forEach(function (row) {
        row.forEach(function (cell) {
            cell.textContent = '';
        });
    });
    count = 0;
}
// 클릭 이벤트 함수
function clickCell(event) {
    // 몇행 몇열인지 체크
    var rowIndex = rows.indexOf(event.currentTarget
        .parentNode);
    var cellIndex = cells[rowIndex].indexOf(event.currentTarget);
    // 셀 클릭 시 카운트 센다.
    count++;
    if (cells[rowIndex][cellIndex].textContent !== '') {
        console.log('빈 칸이 아닙니다.');
    }
    else {
        cells[rowIndex][cellIndex].textContent = turn;
        var full = false;
        // 승리 조건
        if (cells[rowIndex][0].textContent === turn &&
            cells[rowIndex][1].textContent === turn &&
            cells[rowIndex][2].textContent === turn) {
            full = true;
        }
        if (cells[0][cellIndex].textContent === turn &&
            cells[1][cellIndex].textContent === turn &&
            cells[2][cellIndex].textContent === turn) {
            full = true;
        }
        if (cells[0][0].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][2].textContent === turn) {
            full = true;
        }
        if (cells[0][2].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][0].textContent === turn) {
            full = true;
        }
        if (full) {
            result.textContent = turn + "\uB2D8\uC758 \uC2B9\uB9AC..";
            init();
        }
        else if (count === 9) {
            result.textContent = '무승부';
            init();
        }
        else {
            turn = turn === 'O' ? 'X' : 'O';
        }
    }
}
for (var i = 0; i < 3; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    cells.push([]);
    for (var j = 0; j < 3; j++) {
        var cell = document.createElement('td');
        cell.addEventListener('click', clickCell);
        cells[i].push(cell);
        row.appendChild(cell);
    }
    table.appendChild(row);
}
document.body.appendChild(table);
document.body.appendChild(result);
