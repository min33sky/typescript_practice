import * as React from 'react';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
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

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers, []); // ! 랜더링될 때마다 로또 번호가 새로 생성되는걸 막는다.
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    console.log('useEffect');

    // 로또 번호
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = window.setTimeout(() => {
        setWinBalls(prevBalls => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    // 보너스 번호
    timeouts.current[6] = window.setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      console.log('componentWillUnmount');
      timeouts.current.forEach(v => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

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
};

export default Lotto;
