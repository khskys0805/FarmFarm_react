import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import logo from '../../images/logo/farmfarm_logo.png';
import img from '../../images/kakao_login_medium_wide.png';
import API from '../../config';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        console.log("code:" + code);

        if (code) {
            getToken(code);
        }
    }, [location.search]);

    const getToken = async (code) => {
        try {
            const response = await axios.get(API.LOGINTOKEN(code));
            console.log('Response:', response.data); // 디버깅용 콘솔 로그
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            navigate('/home');
        } catch (error) {
            console.error('Error getting token:', error);
        }
    };

    const redirectToKakaoLogin = async () => {
        try {
            const response = await axios.get(API.LOGIN);
            const kakaoAuthUrl = response.data;
            window.location.href = kakaoAuthUrl;
        } catch (error) {
            console.error('Error redirecting to Kakao login:', error);
        }
    };

    return (
        <div className={styles.login}>
            <img className={styles.logo} src={logo} alt='logo' />
            <div className={styles.text}>
                <h1 className={styles.title}>팜팜에 오신걸 환영합니다:)</h1>
                <p className={styles.subtitle}>팜팜에서 다양한 서비스를 이용해보세요!</p>
            </div>
            <button className={styles.button} onClick={redirectToKakaoLogin}>
                <img className={styles.img} src={img} alt='button' />
            </button>
        </div>
    );
};

export default Login;
