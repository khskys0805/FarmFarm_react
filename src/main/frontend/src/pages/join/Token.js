import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from "../../config";
import { BeatLoader } from "react-spinners";

const Token = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (code) {
                    // 첫 번째 요청: 토큰 받기
                    const tokenResponse = await axios.get(API.LOGINTOKEN(code));
                    const { accessToken, refreshToken, nickname } = tokenResponse.data.result;

                    // 토큰을 localStorage에 저장
                    localStorage.setItem('jwt', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    if (nickname) {
                        navigate("/home");
                    } else {
                        navigate("/nickname");
                    }
                }
            } catch (error) {
                console.error('There was an error!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [code, navigate]);

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
