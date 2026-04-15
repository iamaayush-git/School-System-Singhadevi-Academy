import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admission from './pages/Admission'
import Success from './pages/Success'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from './pages/admin/Dashboard'
import Login from './pages/admin/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useEffect } from 'react'
import Gallery from "./pages/Gallery.jsx"


const App = () => {

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/health`)
      .catch(() => { });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/admission' element={<Admission />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/admin-login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
