const API = {
    PRODUCT(ID){
        return `/product/${ID}`
    },
    REGISTERPRODUCT: "/product",
    FARM(ID){
        return `/farm/${ID}`
    },
    ALLPRODUCT: "/product/list",
    ALLFARM: "/farm/list",
    ALLAUCTION: "/product/auction/list",
    MYPAGE: "/myPage",
    MYORDER: "/order",
    MYREVIEW: "/review/my",
    MYENQUIRY: "/enquiry/my",
    MYAUCTION: "/order/auction",
    LOGIN: "/user/login/getKakaoAuthUrl",
    LOGINTOKEN(CODE) {
        return `/user/login/oauth_kakao?code=${CODE}`;
    },
};

export default API;
