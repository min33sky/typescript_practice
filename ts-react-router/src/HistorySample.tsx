import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router';

export default function HistorySample({ history }: RouteComponentProps) {
  // ! React.MutableRefObject이 useRef 타입일 때 current가 readonly 속성이 아니다
  let unblock = useRef<() => void | undefined>();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoHome = () => {
    history.push('/');
  };

  useEffect(() => {
    // 이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈 것인지 질문함
    unblock.current = history.block('정말 떠나실 건가요?');

    return () => {
      // 컴포넌트가 언마운트되면 질문을 멈춤
      if (unblock.current) {
        unblock.current();
      }
    };
  }, [history]);

  return (
    <div>
      <button onClick={handleGoBack}>뒤로</button>
      <button onClick={handleGoHome}>홈으로</button>
    </div>
  );
}
