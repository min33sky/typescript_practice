import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

const rspCoords = {
  rock: '0',
  scissor: '-142px',
  paper: '-284px',
} as const;

const scores = {
  rock: 0,
  scissor: 1,
  paper: -1,
} as const;

type ImgCoords = typeof rspCoords[keyof typeof rspCoords]; // type imgCoords = '0' | '-142px' | '-284px';

// 컴퓨터의 선택 (가위, 바위, 보)
const computerChoice = (imgCoords: ImgCoords) => {
  // ! Object.keys()는 string[]만 리턴하므로 확실하게 타입을 설정을 해주는 것이 좋다.
  return (Object.keys(rspCoords) as ['rock', 'scissor', 'paper']).find(
    key => rspCoords[key] === imgCoords,
  )!; // ! undefined가 리턴 될 일이 없기때문에 !를 붙여준다.
};

const ScissorRockPaper = () => {
  const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.rock);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const interval = useRef<number>();

  useEffect(() => {
    console.log('다시 실행');
    interval.current = window.setInterval(changeHand, 100);
    return () => {
      console.log('종료');
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  // 손 이미지 변경
  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  // HOC
  const onClickBtn = (choice: keyof typeof rspCoords) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore(prevScore => prevScore + 1);
    } else {
      setResult('졌습니다...');
      setScore(prevScore => prevScore - 1);
    }

    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div
        id='computer'
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id='rock' className='btn' onClick={onClickBtn('rock')}>
          바위
        </button>
        <button id='scissor' className='btn' onClick={onClickBtn('scissor')}>
          가위
        </button>
        <button id='paper' className='btn' onClick={onClickBtn('paper')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default ScissorRockPaper;
