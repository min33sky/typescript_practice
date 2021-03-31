import React from 'react';
import { useColorState } from '../contexts/ColorContext';

/**
 * 선택한 색깔을 보여주는 컴포넌트
 */
function ColorBox() {
  const { left, right } = useColorState();

  const leftClickColor = {
    width: '64px',
    height: '64px',
    background: left.color,
    cursor: 'pointer',
  };

  const rightClickColor = {
    width: '32px',
    height: '32px',
    background: right.color,
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
