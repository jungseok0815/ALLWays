import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginForm from "./components/login/LoginForm";
import Welcome from "./components/Welcome";
import Join from "./components/login/Join";
import FindId from "./components/login/FindId";
import FindPassword from "./components/login/FindPassword";
import ResetPassword from "./components/reset/ResetPassword";
import MyPage from "./components/MyPage";

import LandingPage from "./components/views/Landing/LandingPage";
import MapContainer from "./components/views/Landing/Sections/MapContainer";

import AuthRoute from "./state/AuthRoute";

import { useRecoilState } from "recoil";
import { userIdState } from "./state/atom";

function App() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const acessControl = userId;

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/loginform" element={<LoginForm />} />

          <Route
            path="/welcome"
            element={
              <AuthRoute authenticated={acessControl} component={<Welcome />} />
            }
          />

          <Route path="/findid" element={<FindId />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/join" element={<Join />} />

          <Route
            path="/LandingPage"
            element={
              <AuthRoute
                authenticated={acessControl}
                component={<LandingPage />}
              />
            }
          />
          <Route
            path="/MapContainer"
            element={
              <AuthRoute
                authenticated={acessControl}
                component={<MapContainer />}
              />
            }
          />
          <Route
            path="/mypage"
            element={
              <AuthRoute authenticated={acessControl} component={<MyPage />} />
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
