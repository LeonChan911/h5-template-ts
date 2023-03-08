import * as React from 'react';
import { globalStore } from '@/stores/global-store';

export const StoreContext = React.createContext(globalStore);
const useStores = () => {
  const store = React.useContext(StoreContext);
  return store;
};

export default useStores;
