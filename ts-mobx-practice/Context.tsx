import * as React from 'react';
import { userStore, postStore } from './store';
import { createContext, FC } from 'react';

export const storeContext = createContext({
  userStore,
  postStore,
});

const StoreProvider: FC = ({ children }) => {
  return (
    <storeContext.Provider value={{ userStore, postStore }}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
