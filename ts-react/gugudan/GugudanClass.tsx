import * as React from 'react';
import { Component } from 'react';

interface State {
  first: number;
  second: number;
  value: string;
  result: string;
}

class Gugudan extends Component<{}, State> {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
  };

  onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { first, second, value } = this.state;
    if (parseInt(value) === first * second) {
      this.setState(prevState => ({
        result: `정답! ${prevState.value}`,
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
      }));
      if (this.input) {
        this.input.focus();
      }
      if (this.input) {
        this.input.focus();
      }
    } else {
      this.setState({
        result: '꽝',
        value: '',
      });
      if (this.input) {
        this.input.focus();
      }
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    });
  };

  input: HTMLInputElement | null = null;

  onRefInput = (c: HTMLInputElement) => (this.input = c);

  render() {
    const { first, second, value, result } = this.state;
    const { onSubmitForm, onChange, onRefInput } = this;

    return (
      <>
        <div>
          {first} 곱하기 {second}는?
        </div>
        <form onSubmit={onSubmitForm}>
          <input ref={onRefInput} value={value} onChange={onChange} />
        </form>
        <div>{result}</div>
      </>
    );
  }
}

export default Gugudan;
