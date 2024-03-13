const API = {
    PRODUCT(ID){
        return `/product/${ID}`
    },
    ALLPRODUCT: "/product/list",
    ALLFARM: "/farm/list",
    // MYPAGE: "/letterbox/my",
    // CREATEBOX: "/letterbox",
    // LETTERBOX: "/letterbox",
    LOGIN: "/user/login/getKakaoAuthUrl",
    LOGINTOKEN(CODE) {
        return `/user/login/oauth_kakao?code=${CODE}`;
    },
    LETTER(ID) {
        return `/letterbox/${ID}/letter`;
    },
};

export default API;
