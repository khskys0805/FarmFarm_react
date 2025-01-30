import axios from 'axios';

// refresh_token을 이용한 액세스 토큰 갱신 함수
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const REST_API_KEY = process.env.REACT_APP_APP_KEY;

    if (refreshToken) {
        try {
            const formData = new URLSearchParams();
            formData.append('grant_type', 'refresh_token');
            formData.append('client_id', REST_API_KEY);
            formData.append('refresh_token', refreshToken);

            const response = await axios.post('https://kauth.kakao.com/oauth/token', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const newAccessToken = response.data.access_token;
            localStorage.setItem('jwt', newAccessToken); // 새로운 토큰 저장
            return newAccessToken; // 새로운 토큰 반환
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    }
    return null;
};

// axios 인스턴스 생성
const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정
api.interceptors.response.use(
    response => response, // 성공적인 응답은 그대로 리턴
    async error => {
        const originalRequest = error.config;

        // 419 에러 발생 시 토큰 갱신 시도
        if (error.response && error.response.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newAccessToken = await refreshToken();

            if (newAccessToken) {
                // 갱신된 토큰을 요청 헤더에 설정하여 재시도
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest); // 재시도
            }
        }

        return Promise.reject(error); // 여전히 에러가 발생하면 reject
    }
);

export default api; // 이제 api 인스턴스를 export