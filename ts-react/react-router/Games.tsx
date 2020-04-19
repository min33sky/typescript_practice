import * as React from 'react';
import { FC } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import GameMatcher from './GameMatcherClass';

const Games: FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/game/numberBaseball?page=3'>숫자 야구</Link>
        &nbsp;
        <Link to='/game/rsp'>가위 바위 보</Link>
        &nbsp;
        <Link to='/game/lottoGenerator'>로또 생성기</Link>
        &nbsp;
        <Link to='/game/index'>게임 매쳐</Link>
      </div>
      <div>
        <Switch>
          <Route exact path='/' component={GameMatcher} />
          <Route path='/game/:name' component={GameMatcher} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;
