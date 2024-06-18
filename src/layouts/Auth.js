import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/client.css";
import Header from "../components/client/common/Header.js";
import Home from "../pages/Client/Home.js";
import About from "../pages/Client/About";
import Contact from "../pages/Client/Contact";
import Teacher from "../pages/Client/Teacher";
import Products from "../pages/Client/Products";
import News from "../pages/Client/News";
import EnglishCourse from "../pages/Client/EnglishCourse";
import ChineshCourse from "../pages/Client/ChineshCourse";
import Footer from "../components/client/common/Footer";
import TopBar from "../components/client/common/TopBar";
import Calender from "../pages/Client/Calender";
import PrivacyPolicy from "../pages/Client/PrivacyPolicy";
import TermsConditions from "../pages/Client/TermsConditions";
import Login from "../pages/auth/Login.js";
import { ToastContainer } from "react-toastify";
function Auth({ handleLogin }) {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <TopBar />
      <Header />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/products" element={<Products />} />
        <Route path="/news" element={<News />} />
        <Route path="/calender/:id" element={<Calender />} />
        <Route path="/course/english" element={<EnglishCourse />} />
        <Route path="/course/chinesh" element={<ChineshCourse />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms&conditions" element={<TermsConditions />} />
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Auth;
