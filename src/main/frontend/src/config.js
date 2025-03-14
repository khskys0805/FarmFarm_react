const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = {
    PRODUCT(ID) {
        return `${API_BASE_URL}/product/${ID}`;
    },
    REGISTERPRODUCT: `${API_BASE_URL}/product`,
    ALLPRODUCT: `${API_BASE_URL}/product/list`,
    ALLGROUPPRODUCT: `${API_BASE_URL}/product/group/list`,
    GROUPLIST(ID) {
        return `${API_BASE_URL}/product/${ID}/groupList`;
    },
    PRODUCTTOCART(ID) {
        return `${API_BASE_URL}/product/cart/${ID}`;
    },
    CATEGORY(ID) {
        return `${API_BASE_URL}/product/category/${ID}`;
    },
    FARM(ID) {
        return `${API_BASE_URL}/farm/${ID}`;
    },
    FARMPRODUCTS(ID) {
        return `${API_BASE_URL}/farm/${ID}/product`;
    },
    FARMGROUPPRODUCTS(ID) {
        return `${API_BASE_URL}/farm/${ID}/groupProduct`;
    },
    FARMAUCTIONPRODUCTS(ID) {
        return `${API_BASE_URL}/farm/${ID}/auctionProduct`;
    },
    REGISTERFARM: `${API_BASE_URL}/farm`,
    ALLFARM: `${API_BASE_URL}/farm/list`,
    ALLAUCTION: `${API_BASE_URL}/product/auction/list`,
    ATTENDAUCTION(ID) {
        return `${API_BASE_URL}/order/product/${ID}`;
    },
    CART: `${API_BASE_URL}/product/cart`,
    CARTREMOVE(ID) {
        return `${API_BASE_URL}/product/cart/delete/${ID}`;
    },
    ORDERCART: `${API_BASE_URL}/order/cart`,
    CREATEGROUP(ID) {
        return `${API_BASE_URL}/order/createGroup/${ID}`;
    },
    ATTENDGROUP(ID) {
        return `${API_BASE_URL}/order/attendGroup/${ID}`;
    },
    CLOSEGROUP(ID) {
        return `${API_BASE_URL}/order/group/${ID}`;
    },
    ORDER: `${API_BASE_URL}/order`,
    PAYMENT(ID) {
        return `${API_BASE_URL}/pay/order/${ID}`;
    },
    ENQUIRY(ID) {
        return `${API_BASE_URL}/enquiry/${ID}`;
    },
    REGISTERENQUIRY(ID) {
        return `${API_BASE_URL}/enquiry/${ID}`;
    },
    REPLYENQUIRY(ID) {
        return `${API_BASE_URL}/enquiry/reply/${ID}`;
    },
    REVIEW(ID) {
        return `${API_BASE_URL}/review/${ID}`;
    },
    WRITEREVIEW(ID) {
        return `${API_BASE_URL}/review/${ID}`;
    },
    MYPAGE: `${API_BASE_URL}/mypage`,
    MYFARM: `${API_BASE_URL}/farm/my`,
    MYORDER: `${API_BASE_URL}/mypage/orderList`,
    MYAUCTION: `${API_BASE_URL}/mypage/auctionList`,
    MYREVIEW: `${API_BASE_URL}/review/my`,
    MYENQUIRY: `${API_BASE_URL}/enquiry/my`,
    ENQUIRYADMIN: `${API_BASE_URL}/enquiry/admin`,
    SHIPPINGLIST: `${API_BASE_URL}/farm/shippingList`,
    SHIPPINGSTATUS(ID) {
        return `${API_BASE_URL}/farm/shippingList/${ID}`;
    },
    EDITPROFILE: `${API_BASE_URL}/mypage/profile`,
    ISNICKNAME: `${API_BASE_URL}/user/me`,
    CREATENICKNAME: `${API_BASE_URL}/user/nickname`,
    LOGIN: `${API_BASE_URL}/user/login/getKakaoAuthUrl`,
    LOGINTOKEN(CODE) {
        return `${API_BASE_URL}/user/login/oauth_kakao?code=${CODE}`;
    },
    TOKEN: `${API_BASE_URL}/user/login/oauth_kakao`,
    EVENTLIST: `${API_BASE_URL}/events/list`,
    EVENT(ID) {
        return `${API_BASE_URL}/events/${ID}`;
    }
};

export default API;
