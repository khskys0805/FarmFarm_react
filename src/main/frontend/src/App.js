import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Login from "./pages/login/Login"
import CreateNickname from "./pages/login/CreateNickname";
import Token from './pages/join/Token';
import TabBar from './component/TabBar';
import Home from './pages/home/Home';
import AllProduct from './pages/product/AllProduct';
import AllFarm from './pages/farm/AllFarm';
import ProductDetails from './pages/product/ProductDetails';
import MyPage from './pages/myPage/MyPage';
import FarmDetails from './pages/farm/FarmDetails';
import RegisterProduct from './pages/product/RegisterProduct';
import SearchProduct from './pages/search/SearchProduct';
import RegisterFarm from './pages/farm/RegisterFarm';
import ProductShippingAddress from "./pages/product/ProductShippingAddress";
import MyOrderList from './pages/myPage/MyOrderList';
import MyReviewList from './pages/myPage/MyReviewList';
import MyEnquiryList from './pages/myPage/MyEnquiryList';
import MyParticipateAuction from './pages/myPage/MyParticipateAuction';
import WriteReview from './pages/review/WriteReview';
import EditMyProfile from './pages/myPage/EditMyProfile';
import Cart from './pages/cart/Cart';
import PaymentCallback from "./pages/payment/PaymentCallback";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFail from "./pages/payment/PaymentFail";
import Category from "./pages/product/Category";
import AuctionDetail from "./pages/product/AuctionDetail";
import AllAuction from "./pages/product/AllAuction";
import SellerPage from "./pages/seller/SellerPage";
import EnquiryAdminPage from "./pages/enquiry/EnquiryAdminPage";
import EventDetail from "./pages/event/EventDetail";
import {Toaster} from "react-hot-toast";

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
