import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from '/src/context/DataContext';  // 절대 경로로 수정
import Login from '/src/pages/login/Login';  // 절대 경로로 수정
import CreateNickname from '/src/pages/login/CreateNickname';  // 절대 경로로 수정
import Token from '/src/pages/join/Token';  // 절대 경로로 수정
import TabBar from '/src/component/TabBar';  // 절대 경로로 수정
import Home from '/src/pages/home/Home';  // 절대 경로로 수정
import AllProduct from '/src/pages/product/AllProduct';  // 절대 경로로 수정
import AllFarm from '/src/pages/farm/AllFarm';  // 절대 경로로 수정
import ProductDetails from '/src/pages/product/ProductDetails';  // 절대 경로로 수정
import MyPage from '/src/pages/myPage/MyPage';  // 절대 경로로 수정
import FarmDetails from '/src/pages/farm/FarmDetails';  // 절대 경로로 수정
import RegisterProduct from '/src/pages/product/RegisterProduct';  // 절대 경로로 수정
import SearchProduct from '/src/pages/search/SearchProduct';  // 절대 경로로 수정
import RegisterFarm from '/src/pages/farm/RegisterFarm';  // 절대 경로로 수정
import ProductShippingAddress from '/src/pages/product/ProductShippingAddress';  // 절대 경로로 수정
import MyOrderList from '/src/pages/myPage/MyOrderList';  // 절대 경로로 수정
import MyReviewList from '/src/pages/myPage/MyReviewList';  // 절대 경로로 수정
import MyEnquiryList from '/src/pages/myPage/MyEnquiryList';  // 절대 경로로 수정
import MyParticipateAuction from '/src/pages/myPage/MyParticipateAuction';  // 절대 경로로 수정
import WriteReview from '/src/pages/review/WriteReview';  // 절대 경로로 수정
import EditMyProfile from '/src/pages/myPage/EditMyProfile';  // 절대 경로로 수정
import Cart from '/src/pages/cart/Cart';  // 절대 경로로 수정
import PaymentCallback from '/src/pages/payment/PaymentCallback';  // 절대 경로로 수정
import PaymentSuccess from '/src/pages/payment/PaymentSuccess';  // 절대 경로로 수정
import PaymentFail from '/src/pages/payment/PaymentFail';  // 절대 경로로 수정
import Category from '/src/pages/product/Category';  // 절대 경로로 수정
import AuctionDetail from '/src/pages/product/AuctionDetail';  // 절대 경로로 수정
import AllAuction from '/src/pages/product/AllAuction';  // 절대 경로로 수정
import SellerPage from '/src/pages/seller/SellerPage';  // 절대 경로로 수정
import EnquiryAdminPage from '/src/pages/enquiry/EnquiryAdminPage';  // 절대 경로로 수정
import EventDetail from '/src/pages/event/EventDetail';  // 절대 경로로 수정
import { Toaster } from 'react-hot-toast';  // 절대 경로로 수정

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
