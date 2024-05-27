import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/login/Login";
import CreateNickname from "./pages/login/CreateNickname";
import Token from "./pages/join/Token";
import TabBar from "./component/TabBar";
import Home from "./pages/home/Home";
import AuctionList from "./component/AuctionList";
import AllProduct from "./pages/product/AllProduct";
import AllFarm from "./pages/farm/AllFarm";
import ProductDetails from "./pages/product/ProductDetails";
import MyPage from "./pages/myPage/MyPage";
import FarmDetails from "./pages/farm/FarmDetails";
import RegisterProduct from "./pages/product/RegisterProduct";
import SearchProduct from "./pages/search/SearchProduct";
import RegisterFarm from "./pages/farm/RegisterFarm";
import ProductShippingAddress from "./pages/product/ProductShippingAddress";
import MyOrderList from "./pages/myPage/MyOrderList";
import MyReviewList from "./pages/myPage/MyReviewList";
import MyEnquiryList from "./pages/myPage/MyEnquiryList";
import MyParticipateAuction from "./pages/myPage/MyParticipateAuction";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
              <Route
                  path="/"
                  element={
                      localStorage.getItem("jwt") ? (
                          <Navigate replace to="/home" />
                      ) : (
                          <Navigate replace to="/auth" />
                      )
                  }
              />
              <Route path="auth" element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route
                  path="/user/login/oauth_kakao"
                  element={
                      localStorage.getItem("jwt") ? (
                          <Navigate replace to="/home" />
                      ) : (
                          <Token />
                      )
                  }
              />
              <Route
                  path="/user/nickname/create"
                  element={<CreateNickname />}
              />
              <Route
                  path="/tabbar"
                  element={<TabBar />}
              />
              <Route
                  path="/home"
                  element={<Home />}
              />
              <Route
                  path="/registerProduct"
                  element={<RegisterProduct />}
              />
              <Route
                  path="/product/list"
                  element={<AllProduct />}
              />
              <Route
                  path="/farm/list"
                  element={<AllFarm />}
              />
              <Route
                  path="/auction/list"
                  element={<AuctionList />}
              />
              <Route
                  path="/product/:id"
                  element={<ProductDetails />}
              />
              <Route
                  path="/farm/:id"
                  element={<FarmDetails />}
              />
              <Route
                  path="/myPage"
                  element={<MyPage />}
              />
              <Route
                  path="/search"
                  element={<SearchProduct />}
              />
              <Route
                  path="/farm"
                  element={<RegisterFarm />}
              />
              <Route
                  path="/cart"
                  element={<ProductShippingAddress />}
              />
              <Route
                  path="/myOrder"
                  element={<MyOrderList />}
              />
              <Route
                  path="/myReview"
                  element={<MyReviewList />}
              />
              <Route
                  path="/myEnquiry"
                  element={<MyEnquiryList />}
              />
              <Route
                  path="/myParticipateAuction"
                  element={<MyParticipateAuction />}
              />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App;
