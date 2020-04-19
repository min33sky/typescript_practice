import * as React from 'react';
import { FunctionComponent } from 'react';
import { TryInfo } from './types';

// 함수형 컴포넌트에서 state는 useState가 대체해서 제네릭에 타이핑이 없다.
const Try: FunctionComponent<{ tryInfo: TryInfo }> = ({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;
