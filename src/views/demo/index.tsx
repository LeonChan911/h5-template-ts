import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './index.scss';
import Logo from '@/common/img/logo.png';
import useStores from '@/hooks/use-stores';
import { DemoService } from '@/services';
import { CommonEnum } from '@/enum';

const Demo = (props: RouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
  const { login } = useStores();
  const submitLogin = async () => {
    try {
      DemoService.login({
        username: '12',
        password: '12',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    submitLogin();
  }, []);

  return (
    <div className={styles['login-page']}>
      <img className={styles.logo} src={Logo} alt="logo" />
      {id}
      {login === CommonEnum.LoginEnum.LOGGED ? '登了' : '没登录'}
    </div>
  );
};

export default Demo;
