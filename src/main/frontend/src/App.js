import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';  // 절대 경로
import Login from "pages/login/Login";  // 절대 경로
import CreateNickname from "pages/login/CreateNickname";  // 절대 경로
import Token from 'pages/join/Token';  // 절대 경로
import TabBar from 'component/TabBar';  // 절대 경로
import Home from 'pages/home/Home';  // 절대 경로
import AllProduct from 'pages/product/AllProduct';  // 절대 경로
import AllFarm from 'pages/farm/AllFarm';  // 절대 경로
import ProductDetails from 'pages/product/ProductDetails';  // 절대 경로
import MyPage from 'pages/myPage/MyPage';  // 절대 경로
import FarmDetails from 'pages/farm/FarmDetails';  // 절대 경로
import RegisterProduct from 'pages/product/RegisterProduct';  // 절대 경로
import SearchProduct from 'pages/search/SearchProduct';  // 절대 경로
import RegisterFarm from 'pages/farm/RegisterFarm';  // 절대 경로
import ProductShippingAddress from "pages/product/ProductShippingAddress";  // 절대 경로
import MyOrderList from 'pages/myPage/MyOrderList';  // 절대 경로
import MyReviewList from 'pages/myPage/MyReviewList';  // 절대 경로
import MyEnquiryList from 'pages/myPage/MyEnquiryList';  // 절대 경로
import MyParticipateAuction from 'pages/myPage/MyParticipateAuction';  // 절대 경로
import WriteReview from 'pages/review/WriteReview';  // 절대 경로
import EditMyProfile from 'pages/myPage/EditMyProfile';  // 절대 경로
import Cart from 'pages/cart/Cart';  // 절대 경로
import PaymentCallback from "pages/payment/PaymentCallback";  // 절대 경로
import PaymentSuccess from "pages/payment/PaymentSuccess";  // 절대 경로
import PaymentFail from "pages/payment/PaymentFail";  // 절대 경로
import Category from "pages/product/Category";  // 절대 경로
import AuctionDetail from "pages/product/AuctionDetail";  // 절대 경로
import AllAuction from "pages/product/AllAuction";  // 절대 경로
import SellerPage from "pages/seller/SellerPage";  // 절대 경로
import EnquiryAdminPage from "pages/enquiry/EnquiryAdminPage";  // 절대 경로
import EventDetail from "pages/event/EventDetail";  // 절대 경로
import { Toaster } from "react-hot-toast";  // 절대 경로

function App() {
    return (
        <BrowserRouter>
            <DataProvider>
                <div className="App">
                    <Toaster />
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/auth" />} />
                        <Route path="/auth" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login/oauth_kakao" element={<Token />} />
                        <Route path="/nickname" element={<CreateNickname />} />
                        <Route path="/tabbar" element={<TabBar />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/registerProduct" element={<RegisterProduct />} />
                        <Route path="/editProduct/:id" element={<RegisterProduct />} />
                        <Route path="/productList" element={<AllProduct type={new URLSearchParams(window.location.search).get('type') || "product"} />} />
                        <Route path="/allFarm" element={<AllFarm />} />
                        <Route path="/allAuction" element={<AllAuction />} />
                        <Route path="/productDetail/:id" element={<ProductDetails />} />
                        <Route path="/auctionDetail/:id" element={<AuctionDetail />} />
                        <Route path="/farmDetail/:id" element={<FarmDetails />} />
                        <Route path="/myPage" element={<MyPage />} />
                        <Route path="/myFarm" element={<FarmDetails myFarm={true}/>} />
                        <Route path="/search" element={<SearchProduct />} />
                        <Route path="/registerFarm" element={<RegisterFarm />} />
                        <Route path="/editFarm/:id" element={<RegisterFarm />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/shippingAddress" element={<ProductShippingAddress />} />
                        <Route path="/myOrder" element={<MyOrderList />} />
                        <Route path="/myAuction" element={<MyParticipateAuction />} />
                        <Route path="/myReview" element={<MyReviewList />} />
                        <Route path="/myEnquiry" element={<MyEnquiryList />} />
                        <Route path="/review/write" element={<WriteReview />} />
                        <Route path="/editProfile" element={<EditMyProfile />} />
                        <Route path="/paymentCallback" element={<PaymentCallback />} />
                        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
                        <Route path="/paymentFail" element={<PaymentFail />} />
                        <Route path="/deliveryAdmin" element={<SellerPage />} />
                        <Route path="/enquiryAdmin" element={<EnquiryAdminPage />} />
                        <Route path="/event/:id" element={<EventDetail />} />
                    </Routes>
                </div>
            </DataProvider>
        </BrowserRouter>
    );
}

export default App;
