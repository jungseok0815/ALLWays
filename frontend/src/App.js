import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginForm from "./components/login/LoginForm";
import Welcome from "./components/Welcome";
import Join from "./components/login/Join";
import FindId from "./components/login/FindId";
import FindPassword from "./components/login/FindPassword";
import ResetPassword from "./components/reset/ResetPassword";
import FavoriteForm from "./components/favorite/favorite";
import LandingPage from './components/views/Landing/LandingPage';
import MapContainer from './components/views/Landing/Sections/MapContainer';
import MyPage from "./components/views/Landing/Sections/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/join" element={<Join />} />
        <Route path="/favorite" element={<FavoriteForm/>} />
        <Route path="/LandingPage" element={<LandingPage/>}/>
        <Route path="/MapContainer" element={<MapContainer/>}/>
        <Route path="/MyPage" element={<MyPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
