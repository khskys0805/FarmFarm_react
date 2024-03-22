const API = {
    PRODUCT(ID){
        return `/product/${ID}`
    },
    ALLPRODUCT: "/product/list",
    ALLFARM: "/farm/list",
    ALLAUCTION: "/product/auction/list",
    LOGIN: "/user/login/getKakaoAuthUrl",
    LOGINTOKEN(CODE) {
        return `/user/login/oauth_kakao?code=${CODE}`;
    },
};

export default API;
