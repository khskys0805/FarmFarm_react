const API = {
    PRODUCT(ID){
        return `/product/${ID}`
    },
    REGISTERPRODUCT: "/product",
    ALLPRODUCT: "/product/list",
    ALLGROUPPRODUCT: "/product/group/list",
    GROUPLIST(ID){
        return `/product/${ID}/groupList`
    },
    PRODUCTTOCART(ID){
        return `/product/cart/${ID}`
    },
    FARM(ID){
        return `/farm/${ID}`
    },
    FARMPRODUCTS(ID){
        return `/farm/${ID}/product`
    },
    REGISTERFARM: "/farm",
    ALLFARM: "/farm/list",
    ALLAUCTION: "/product/auction/list",
    ATTENDAUCTION(ID){
        return `/order/product/${ID}`
    },
    CART: "/product/cart",
    CARTREMOVE(ID){
        return `/product/cart/delete/${ID}`
    },
    ORDERCART: "/order/cart",
    CREATEGROUP(ID){
        return `/order/createGroup/${ID}`
    },
    ATTENDGROUP(ID){
        return `/order/attendGroup/${ID}`
    },
    CLOSEGROUP(ID){
        return `/order/group/${ID}`
    },
    ORDER: "/order",
    PAYMENT(ID){
        return `/pay/order/${ID}`
    },
    MYPAGE: "/myPage",
    MYORDER: "/mypage/orderList",
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
