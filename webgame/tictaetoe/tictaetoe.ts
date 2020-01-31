const table: HTMLTableElement = document.createElement('table');
const rows: HTMLTableRowElement[] = [];
const cells: HTMLTableCellElement[][] = [];
let turn: 'O' | 'X' = 'X';
const result: HTMLDivElement = document.createElement('div');
let count: number = 0;

// 초기화
function init() {
  turn = 'X';
  cells.forEach(row => {
    row.forEach(cell => {
      cell.textContent = '';
    });
  });
  count = 0;
}

// 클릭 이벤트 함수
function clickCell(event: MouseEvent) {
  // 몇행 몇열인지 체크
  const rowIndex: number = rows.indexOf(
    (event.currentTarget as HTMLTableCellElement)
      .parentNode as HTMLTableRowElement,
  );

  const cellIndex: number = cells[rowIndex].indexOf(
    event.currentTarget as HTMLTableCellElement,
  );

  // 셀 클릭 시 카운트 센다.
  count++;

  if (cells[rowIndex][cellIndex].textContent !== '') {
    console.log('빈 칸이 아닙니다.');
  } else {
    cells[rowIndex][cellIndex].textContent = turn;

    let full: boolean = false;

    // 승리 조건
    if (
      cells[rowIndex][0].textContent === turn &&
      cells[rowIndex][1].textContent === turn &&
      cells[rowIndex][2].textContent === turn
    ) {
      full = true;
    }

    if (
      cells[0][cellIndex].textContent === turn &&
      cells[1][cellIndex].textContent === turn &&
      cells[2][cellIndex].textContent === turn
    ) {
      full = true;
    }

    if (
      cells[0][0].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][2].textContent === turn
    ) {
      full = true;
    }

    if (
      cells[0][2].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][0].textContent === turn
    ) {
      full = true;
    }

    if (full) {
      result.textContent = `${turn}님의 승리..`;
      init();
    } else if (count === 9) {
      result.textContent = '무승부';
      init();
    } else {
      turn = turn === 'O' ? 'X' : 'O';
    }
  }
}

for (let i: number = 0; i < 3; i++) {
  const row: HTMLTableRowElement = document.createElement('tr');
  rows.push(row);
  cells.push([]);

  for (let j: number = 0; j < 3; j++) {
    const cell: HTMLTableCellElement = document.createElement('td');
    cell.addEventListener('click', clickCell);
    cells[i].push(cell);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

document.body.appendChild(table);
document.body.appendChild(result);
