import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login/Login";
import CreateNickname from "./pages/Login/CreateNickname";
import Token from "./pages/join/Token";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
                path="/"
                element={
                    localStorage.getItem("jwt") ? (
                        <Navigate replace to="/" />
                    ) : (
                        <Login />
                    )
                }
            />
              <Route
                  path="/user/login/oauth_kakao"
                  element={
                      localStorage.getItem("jwt") ? (
                          <Navigate replace to="/" />
                      ) : (
                          <Token />
                      )
                  }
              />
              <Route
                  path="/user/nickname/create"
                  element={<CreateNickname />}
              />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App;
