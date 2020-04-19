import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Baseball from './Baseball';

const Hot = hot(Baseball);

ReactDOM.render(<Hot />, document.querySelector('#root'));
