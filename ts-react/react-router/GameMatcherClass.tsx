import * as React from 'react';
import { Component } from 'react';
import { RouteChildrenProps } from 'react-router';
import NumberBaseball from '../baseball/Baseball';
import RSP from '../scissorRockPaper/scissorRockPaper';
import Lotto from '../lotto/LottoClass';

// react-router를 위한 props가 패키지에서 제공된다.
class GameMatcher extends Component<RouteChildrenProps<{ name: string }>> {

  render() {
    if (!this.props.match) {
      return <div>일치하는 게임이 없습니다.</div>;
    }

    let urlSearchParams = new URLSearchParams(
      this.props.location.search.slice(1),
    );
    console.log(urlSearchParams.get('page'));
    // match에도 제네릭 설정을 통해 타입을 지정할 수 있다.
    if (this.props.match.params.name === 'numberBaseball') {
      return <NumberBaseball />;
    } else if (this.props.match.params.name === 'rsp') {
      return <RSP />;
    } else if (this.props.match.params.name === 'lottoGenerator') {
      return <Lotto />;
    } else {
      return <div>일치하는 게임이 없습니다.</div>;
    }
  }
}

export default GameMatcher;
