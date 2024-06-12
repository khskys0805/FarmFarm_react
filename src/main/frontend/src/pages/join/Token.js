import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API from '../../config';

const Token = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        console.log('Code:', code); // 디버깅용 콘솔 로그

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

    return null; // 이 페이지는 리디렉션을 위해서만 존재
};

export default Token;
