import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'; 
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Formations from './pages/formations';
import FormationDetails from './pages/formationDetails';
import Actualites from './pages/Actualites';
import ActualiteDetails from './pages/ActualiteDetails';

import Login from './pages/login';

import './Styles/App.css';

import NewsDashboard from "./pages/Dashbord/NewsDashboard";
import AddNews from "./pages/Dashbord/AddNews";
import EditNews from "./pages/Dashbord/EditNews";

import NotFound from "./pages/notFound";

const ScrollToSection = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = pathname.substring(1); 

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
};

function App() {
  const token = localStorage.getItem('token');
  const isAdmin = token && localStorage.getItem('is_admin') === '1';

  // الصفحة الرئيسية الموحدة للزوار (One Page) بدون لوحة تحكم الأدمن
  const MainPage = (
    <main>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="formations"><Formations /></section>
      {/* دابا هنا ولاو كيبانو الكروت والمربعات ناضيين للناس في الصفحة الرئيسية */}
      <section id="actualites"><Actualites /></section> 
      <section id="contact"><Contact /></section>
    </main>
  );

  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <ScrollToSection /> 
      <Navbar /> 
      
      <Routes>
        {/* الروابط الأساسية للموقع كتفتح الصفحة الكاملة مع السكرول */}
        <Route path="/" element={MainPage} />
        <Route path="/home" element={MainPage} />
        <Route path="/about" element={MainPage} />
        <Route path="/formations" element={MainPage} />
        <Route path="/actualites" element={MainPage} /> {/* رجعناها لـ MainPage باش يخدم السكرول للكروت */}
        <Route path="/contact" element={MainPage} />

        {/* صفحة تفاصيل خبر معزولة */}
        <Route path="/actualites/:id" element={<ActualiteDetails />} />
        <Route path="/formations/:id" element={<FormationDetails />} />

        {/* ROUTES D'ADMINISTRATION (Pages protégées) */}
        <Route 
          path="/dashboard" 
          element={isAdmin ? <NewsDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/create" 
          element={isAdmin ? <AddNews /> : <Navigate to="/" />} 
        />
        <Route 
          path="/edit/:id" 
          element={isAdmin ? <EditNews /> : <Navigate to="/" />} 
        /> 

        <Route path="/admin-login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;