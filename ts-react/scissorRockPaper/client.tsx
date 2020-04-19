import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import RSC from './scissorRockPaper';

const Hot = hot(RSC);

ReactDOM.render(<Hot />, document.querySelector('#root'));
