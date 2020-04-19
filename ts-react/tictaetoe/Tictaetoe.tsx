import * as React from 'react';
import { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

interface ReducerState {
  winner: 'O' | 'X' | '';
  turn: 'O' | 'X';
  tableData: string[][];
  recentCell: [number, number]; // 턴 마다 승리조건을 확인하기 위한 좌표
}

const initialState: ReducerState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;
export const CHANGE_TURN = 'CHANGE_TURN' as const;
export const RESET_GAME = 'RESET_GAME' as const;

interface SetWinnerAction {
  type: typeof SET_WINNER;
  winner: 'O' | 'X';
}

const setWinner = (winner: 'O' | 'X'): SetWinnerAction => {
  return {
    type: SET_WINNER,
    winner,
  };
};

interface ClickCellAction {
  type: typeof CLICK_CELL;
  row: number;
  cell: number;
}

export const clickCell = (row: number, cell: number): ClickCellAction => {
  return {
    type: CLICK_CELL,
    row,
    cell,
  };
};

interface ChangeTurnAction {
  type: typeof CHANGE_TURN;
}

interface ResetGameAction {
  type: typeof RESET_GAME;
}

type ReducerActions =
  | SetWinnerAction
  | ClickCellAction
  | ChangeTurnAction
  | ResetGameAction;

const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };

    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;

      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }

    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };

    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };

    default:
      return state;
  }
};

const Tictaetoe = () => {
  // const [state, dispatch] = useReducer<React.Reducer<ReducerState, ReducerActions>>(reducer, initialState);
  const [state, dispatch] = useReducer(reducer, initialState); // 타입 추론이 안될때는 제네릭에 써준다.
  const { tableData, turn, winner, recentCell } = state;

  useEffect(() => {
    const [row, cell] = recentCell;
    let win = false;

    // 게임 시작 전엔 승리 체크 X
    if (row < 0) {
      return;
    }

    // 승리 조건 판별
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }

    console.log(win, row, cell, tableData, turn);

    if (win) {
      // 승리시
      dispatch(setWinner(turn));
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach(row => {
        // 무승부 검사
        row.forEach(cell => {
          // 빈 칸이 있으면 계속 게임 진행
          if (!cell) {
            all = false;
          }
        });
      });

      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  const onClickTable = useCallback(() => {
    dispatch(setWinner('O'));
  }, []);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default Tictaetoe;
