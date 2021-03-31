import React, { createContext, Dispatch, useReducer, useContext } from 'react';

type ColorState = {
  left: { color: string };
  right: { color: string };
};

const ColorStateContext = createContext<ColorState | undefined>(undefined);

type Action =
  | {
      type: 'LEFT_CLICK';
      color: string;
    }
  | {
      type: 'RIGHT_CLICK';
      color: string;
    };

type ColorDispatch = Dispatch<Action>;

const ColorDispatchContext = createContext<ColorDispatch | undefined>(
  undefined,
);

function colorReducer(state: ColorState, action: Action): ColorState {
  switch (action.type) {
    case 'LEFT_CLICK':
      return {
        ...state,
        left: {
          color: action.color,
        },
      };

    case 'RIGHT_CLICK':
      return {
        ...state,
        right: {
          color: action.color,
        },
      };

    default:
      throw new Error('Unhandled action');
  }
}

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, dispatch] = useReducer(colorReducer, {
    left: {
      color: 'black',
    },
    right: {
      color: 'red',
    },
  });

  return (
    <ColorDispatchContext.Provider value={dispatch}>
      <ColorStateContext.Provider value={color}>
        {children}
      </ColorStateContext.Provider>
    </ColorDispatchContext.Provider>
  );
};

export function useColorState() {
  const state = useContext(ColorStateContext);
  if (!state) throw new Error('ColorProvier not found');
  return state;
}

export function useColorDispatch() {
  const dispatch = useContext(ColorDispatchContext);
  if (!dispatch) throw new Error('ColorProvider not found');
  return dispatch;
}
