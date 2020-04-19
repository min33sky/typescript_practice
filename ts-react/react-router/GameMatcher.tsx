import * as React from 'react';
import NumberBaseball from '../baseball/Baseball';
import RSP from '../scissorRockPaper/scissorRockPaper';
import Lotto from '../lotto/LottoClass';
import { useRouteMatch, useLocation, useHistory } from 'react-router';

const GameMatcher = () => {
  const match = useRouteMatch<{ name: string }>();
  const location = useLocation();
  const history = useHistory();

  if (!match) {
    return <div>일치하는 게임이 없습니다.</div>;
  }
  let urlSearchParams = new URLSearchParams(location.search.slice(1));
  console.log(urlSearchParams.get('page'));
  console.log(match.params.name);
  if (match.params.name === 'numberBaseball') {
    return <NumberBaseball />;
  } else if (match.params.name === 'rsp') {
    return <RSP />;
  } else if (match.params.name === 'lottoGenerator') {
    return <Lotto />;
  } else {
    return <div>일치하는 게임이 없습니다.</div>;
  }
};

export default GameMatcher;
