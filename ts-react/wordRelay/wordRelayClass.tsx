import * as React from 'react';
import { createRef, Component } from 'react';

interface State {
  word: string;
  value: string;
  result: string;
}

class WordRelay extends Component<{}, State> {
  state = {
    word: '맹구',
    value: '',
    result: '',
  };

  onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = this.inputRef.current;
    const { word, value } = this.state;

    if (word[word.length - 1] === value[0]) {
      this.setState({
        result: '정답',
        value: '',
        word: value,
      });
      if (input) {
        input.focus();
      }
    } else {
      this.setState({
        result: '틀림',
        value: '',
      });
      if (input) {
        input.focus();
      }
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  inputRef = createRef<HTMLInputElement>();

  render() {
    const { word, value, result } = this.state;
    const { onSubmitForm, onChange, inputRef } = this;
    return (
      <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
          <input ref={inputRef} value={value} onChange={onChange} />
        </form>
        <div>{result}</div>
      </>
    );
  }
}

export default WordRelay;
