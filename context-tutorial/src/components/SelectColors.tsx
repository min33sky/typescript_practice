import React from 'react';
import { useColorDispatch } from '../contexts/ColorContext';
import { colors } from '../utils/color';

/**
 * 색깔을 선택하는 컴포넌트
 */
function SelectColors() {
  const dispatch = useColorDispatch();

  const getStyle = (color: string) => ({
    background: color,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
    cursor: 'pointer',
  });

  const onLeftClick = (color: string) => {
    dispatch({
      type: 'LEFT_CLICK',
      color,
    });
  };

  return (
    <div>
      <h2>색상을 선택하세요</h2>
      <div style={{ display: 'flex' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={getStyle(color)}
            onClick={() => onLeftClick(color)}
            onContextMenu={(e) => {
              e.preventDefault();
              dispatch({
                type: 'RIGHT_CLICK',
                color,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectColors;
