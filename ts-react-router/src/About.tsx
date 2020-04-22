import React from 'react';
import qs from 'qs';
import { RouteComponentProps } from 'react-router';

export default function About({ location }: RouteComponentProps) {
  // 쿼리스트링을 객체형태로 파싱한다.
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // ? 이 설정을 통해 문자열 맨 앞의 ?를 생략한다.
  });

  const showDetail = query.detail === 'true'; // ! 쿼리의 파싱 결과 값은 문자열이다.

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초들 실습해 보는 예제 프로젝트입니다</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요.</p>}
    </div>
  );
}
