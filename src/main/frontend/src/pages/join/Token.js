import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from "../../config";
import { BeatLoader } from "react-spinners";

const Token = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Token component mounted');
                if (code) {
                    console.log('Code received:', code); // 디버깅용 콘솔 로그

                    // 첫 번째 요청: 토큰 받기
                    const tokenResponse = await axios.get(API.LOGINTOKEN(code));
                    console.log(tokenResponse.data);

                    // 토큰을 받아서 localStorage 같은 곳에 저장
                    localStorage.setItem('jwt', tokenResponse.data.result.accessToken);
                    localStorage.setItem('refreshToken', tokenResponse.data.result.refreshToken);

                    // // 두 번째 요청: 닉네임 확인
                    // const nicknameResponse = await axios.get(API.ISNICKNAME, {
                    //     headers: { Authorization: `Bearer ${tokenResponse.data.result.accessToken}` },
                    // });
                    // console.log(nicknameResponse.data);

                    const nickname = tokenResponse.data.result.nickname;
                    if (nickname) {
                        console.log(nickname);
                        navigate("/home");
                    } else {
                        console.log(nickname);
                        navigate("/nickname");
                    }
                }
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchData();
    }, [code, navigate]);

    return (
        <div style={{ height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <BeatLoader color="#94C015" />
        </div>
    );
};
export default Token;

