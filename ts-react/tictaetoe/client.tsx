import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Tictaetoe from './tictaetoe';

const Hot = hot(Tictaetoe);

ReactDOM.render(<Hot />, document.querySelector('#root'));
