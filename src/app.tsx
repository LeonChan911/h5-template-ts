import React, { useState, useEffect } from 'react';
import { StoreContext } from '@/hooks/use-stores';
import { hot } from 'react-hot-loader/root';
import { globalStore } from '@/stores/global-store';
import { LoginService } from '@/services';
import { CommonEnum } from '@/enum';
import { useAsyncFn } from 'react-use';
import { setRightMenu } from '@/utils/jssdk';

import Router from '@/router';

const App = () => {
  const [login, setLogin] = useState(globalStore.login);
  const [, requestUserInfo] = useAsyncFn(async () => {
    try {
      const info = await LoginService.getUserInfo();
      setLogin(info.userId ? CommonEnum.LoginEnum.LOGGED : CommonEnum.LoginEnum.UNLOGGED);
      return info;
    } catch (error) {
      setLogin(CommonEnum.LoginEnum.UNLOGGED);
      return null;
    }
  }, []);

  useEffect(() => {
    setRightMenu([], () => {});
    requestUserInfo();
  }, []);

  return (
    <StoreContext.Provider value={{ login, setLogin }}>
      <Router />
    </StoreContext.Provider>
  );
};

export default hot(App);
