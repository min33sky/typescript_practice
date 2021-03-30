import React, { createContext, useState, Dispatch } from 'react';

const ColorContext = createContext<{
  state: {
    color: string;
    subcolor: string;
  };
  actions: {
    setColor: Dispatch<string>;
    setSubcolor: Dispatch<string>;
  };
}>({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

type ColorProviderProps = {
  children: React.ReactNode;
};

const ColorProvider = ({ children }: ColorProviderProps) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorConsumer, ColorProvider };

export default ColorContext;
