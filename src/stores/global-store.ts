import React from 'react';
import { CommonEnum } from '@/enum';

const setLogin: React.Dispatch<React.SetStateAction<CommonEnum.LoginEnum>> = () => {};

const globalStore = {
  login: CommonEnum.LoginEnum.PENDDING,
  setLogin,
};
export { globalStore };
