import React from 'react';
import { ColorConsumer } from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

/**
 * 색깔을 선택하는 컴포넌트
 */
function SelectColors() {
  const getStyle = (color: string) => ({
    background: color,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
    cursor: 'pointer',
  });

  return (
    <div>
      <h2>색상을 선택하세요</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: 'flex' }}>
            {colors.map((color) => (
              <div
                key={color}
                style={getStyle(color)}
                onClick={() => actions.setColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  actions.setSubcolor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
    </div>
  );
}

export default SelectColors;
