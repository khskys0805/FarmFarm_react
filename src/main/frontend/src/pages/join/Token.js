import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import API from '../../config';
import { BeatLoader } from "react-spinners";
import axios from "axios";
const Token = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const code = new URL(window.location.href).searchParams.get('code');
    const REST_API_KEY = process.env.REACT_APP_APP_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (code) {
                    const formData = new URLSearchParams();
                    formData.append('grant_type', 'authorization_code');
                    formData.append('client_id', REST_API_KEY);
                    formData.append('redirect_uri', REDIRECT_URI);
                    formData.append('code', code); // 인가 코드

                    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    });

                    console.log(tokenResponse.data); // 서버에서 반환된 토큰 데이터

                    const { access_token } = tokenResponse.data;
                    console.log("access_token " + access_token);

                    // access_token을 API로 보내기
                    api.post(API.TOKEN, { accessToken:access_token },{ withCredentials: true })
                        .then(res => {
                            console.log(res.data);
                            // 토큰을 localStorage에 저장
                            localStorage.setItem('jwt', res.data.result.accessToken);
                            localStorage.setItem('refreshToken', res.data.result.refreshToken);

                            // 🔥 localStorage 변경 이벤트 발생 (DataProvider에서 감지하도록)
                            window.dispatchEvent(new Event('storage'));

                            // window.location.reload();  // ✅ 새로고침 추가

                            // 🚀 100ms 정도 딜레이 후 navigate 실행
                            setTimeout(() => {
                                if (res.data.result.nickname) {
                                    navigate("/home");
                                } else {
                                    navigate("/nickname");
                                }
                            }, 100);
                        })
                        .catch(error => {
                            console.error('Error sending token:', error);
                        });
                }
            } catch (error) {
                console.error('Error occurred:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [code, navigate, REDIRECT_URI, REST_API_KEY]);

    if (loading) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BeatLoader color="#94C015" />
            </div>
        );
    }

    return null;
};

export default Token;
