import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

/**
 * 선택한 색깔을 보여주는 컴포넌트
 */
function ColorBox() {
  const {
    state: { color, subcolor },
  } = useContext(ColorContext);

  const leftClickColor = {
    width: '64px',
    height: '64px',
    background: color,
    cursor: 'pointer',
  };

  const rightClickColor = {
    width: '32px',
    height: '32px',
    background: subcolor,
    cursor: 'pointer',
  };

  return (
    <>
      <div style={leftClickColor} />
      <div style={rightClickColor} />
    </>
  );
}

export default ColorBox;
