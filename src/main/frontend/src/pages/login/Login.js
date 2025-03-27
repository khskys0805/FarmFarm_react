import React from 'react';
import styles from './Login.module.css';
import logo from '../../images/logo/farmfarm_logo.png';
import img from '../../images/kakao_login_large_wide.png';

const Login = () => {
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const REST_API_KEY = process.env.REACT_APP_APP_KEY;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    console.log(link);
    const loginHandler = () => {
        window.location.href = link;
    }

    return (
        <div className={styles.login}>
            <img className={styles.logo} src={logo} alt='logo' />
            <div className={styles.text}>
                <h1 className={styles.title}>팜팜에 오신걸 환영합니다:)</h1>
                <p className={styles.subtitle}>팜팜에서 다양한 서비스를 이용해보세요!</p>
            </div>
            <button className={styles.button} onClick={loginHandler}>
                <img className={styles.img} src={img} alt='button' />
            </button>
        </div>
    );
};

export default Login;
