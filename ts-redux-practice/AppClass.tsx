import * as React from 'react';
import { connect } from 'react-redux';
import { UserState } from './reducers/user';
import { Component } from 'react';
import { logIn, logOut, LogInType, ThunkDispatch } from './actions/user';
import { RootState } from './reducers';

interface StateToProps {
  user: UserState;
}

interface DispatchToProps {
  dispatchLogIn: ({ id, password }: LogInType) => void;
  dispatchLogOut: () => void;
}

class App extends Component<StateToProps & DispatchToProps> {
  onClick = () => {
    this.props.dispatchLogIn({
      id: 'messi',
      password: '1234',
    });
  };

  onLogOut = () => {
    this.props.dispatchLogOut();
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.isLoggingIn ? (
          <div>로그인 중</div>
        ) : user.data ? (
          <div>{user.data.nickname}</div>
        ) : (
          '로그인 해주세요'
        )}
        {!user.data ? (
          <button onClick={this.onClick}>로그인</button>
        ) : (
          <button onClick={this.onLogOut}>로그아웃</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  post: state.post,
}); // 참고: reselect

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  dispatchLogIn: (data: LogInType) => dispatch(logIn(data)),
  dispatchLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
