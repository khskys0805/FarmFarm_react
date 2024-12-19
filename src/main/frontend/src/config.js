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
    CATEGORY(ID){
        return `/product/category/${ID}`
    },
    FARM(ID){
        return `/farm/${ID}`
    },
    FARMPRODUCTS(ID){
        return `/farm/${ID}/product`
    },
    FARMGROUPPRODUCTS(ID){
        return `/farm/${ID}/groupProduct`
    },
    FARMAUCTIONPRODUCTS(ID){
        return `/farm/${ID}/auctionProduct`
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
    ENQUIRY(ID){
        return `/enquiry/${ID}`
    },
    REGISTERENQUIRY(ID){
        return `/enquiry/${ID}`
    },
    REPLYENQUIRY(ID){
        return `/enquiry/reply/${ID}`
    },
    REVIEW(ID){
        return `/review/${ID}`
    },
    WRITEREVIEW(ID){
        return `/review/${ID}`
    },
    MYPAGE: "/mypage",
    MYFARM:"/farm/my",
    MYORDER: "/mypage/orderList",
    MYAUCTION: "/mypage/auctionList",
    MYREVIEW: "/review/my",
    MYENQUIRY: "/enquiry/my",
    ENQUIRYADMIN: "/enquiry/admin",
    SHIPPINGLIST:"/farm/shippingList",
    SHIPPINGSTATUS(ID){
        return `/farm/shippingList/${ID}`
    },
    EDITPROFILE: "/mypage/profile",
    ISNICKNAME: "/user/me",
    CREATENICKNAME: "/user/nickname",
    LOGIN: "/user/login/getKakaoAuthUrl",
    LOGINTOKEN(CODE) {
        return `/user/login/oauth_kakao?code=${CODE}`;
    },
    TOKEN: "/user/login/oauth_kakao",
};

export default API;
