import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './components/SelectColors';

function App() {
  return (
    <ColorProvider>
      <SelectColors />
      <hr />
      <ColorBox />
    </ColorProvider>
  );
}

export default App;
