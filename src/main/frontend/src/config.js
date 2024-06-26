const API = {
    PRODUCT(ID){
        return `/product/${ID}`
    },
    REGISTERPRODUCT: "/product",
    ALLPRODUCT: "/product/list",
    FARM(ID){
        return `/farm/${ID}`
    },
    FARMPRODUCTS(ID){
        return `/farm/${ID}/product`
    },
    REGISTERFARM: "/farm",
    ALLFARM: "/farm/list",
    ALLAUCTION: "/product/auction/list",
    MYPAGE: "/myPage",
    MYORDER: "/order",
    MYREVIEW: "/review/my",
    MYENQUIRY: "/enquiry/my",
    MYAUCTION: "/order/auction",
    ISNICKNAME: "/user/me",
    CREATENICKNAME: "/user/nickname",
    LOGIN: "/user/login/getKakaoAuthUrl",
    LOGINTOKEN(CODE) {
        return `/user/login/oauth_kakao?code=${CODE}`;
    },
};

export default API;
