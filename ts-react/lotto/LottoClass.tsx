import * as React from 'react';
import { Component } from 'react';
import Ball from './Ball';

// 로또 번호 생성 함수
function getWinNumbers() {
  const candidates = Array(45)
    .fill(null)
    .map((v, i) => i + 1);
  const shuffle = [];

  while (candidates.length > 0) {
    shuffle.push(
      candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0],
    );
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  return [...winNumbers, bonusNumber];
}

interface State {
  winNumbers: number[];
  winBalls: number[];
  bonus: number | null;
  redo: boolean;
}

class Lotto extends Component<{}, State> {
  state: State = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts: number[] = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    const { timeouts } = this;

    // 로또 번호
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts[i] = window.setTimeout(() => {
        this.setState(prevState => ({
          winBalls: [...prevState.winBalls, winNumbers[i]],
        }));
      }, (i + 1) * 1000);
    }

    // 보너스 번호
    timeouts[6] = window.setTimeout(() => {
      this.setState({ bonus: winNumbers[6] });
      this.setState({
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log('로또 숫자를 생성합니다.');
  }

  componentWillUnmount() {
    console.log('componentDidUnmount');
    this.timeouts.forEach(v => {
      clearTimeout(v);
    });
  }

  // ! 타입스크립트의 한계 : 타입이 any로 나와서 다시 설정해주어야 한다.
  componentDidUpdate(prevProps: {}, prevState: State) {
    console.log('componentDidUpdate');
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log('로또 숫자를 생성합니다.');
    }
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    const { onClickRedo } = this;
    return (
      <>
        <div>당첨 숫자</div>
        <div id='결과창'>
          {winBalls.map(v => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
