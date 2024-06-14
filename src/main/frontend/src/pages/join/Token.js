import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Token = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        console.log('Token component mounted');
        if (code) {
            console.log('Code received:', code); // 디버깅용 콘솔 로그
            axios.get(`http://localhost:9000/user/login/oauth_kakao?code=${code}`)
                .then((response) => {
                    console.log(response.data);

                    // 토큰을 받아서 localStorage 같은 곳에 저장하는 코드를 여기에 쓴다.
                    localStorage.setItem('name', response.data.user_name); // 일단 이름만 저장했다.

                    navigate('/home');
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
    }, [code, navigate]);

    return (
        <div>
            Redirecting...
        </div>
    );
};

export default Token;
