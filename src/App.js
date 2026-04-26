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
import Login from './pages/login';
import './Styles/App.css';

import NewsDashboard from "./pages/Dashbord/NewsDashboard";
import AddNews from "./pages/Dashbord/AddNews";
import EditNews from "./pages/Dashbord/EditNews";

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

  const MainPage = (
    <main>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="formations"><Formations /></section>
      <section id="dashboard_view"><NewsDashboard /></section> 
      <section id="contact"><Contact /></section>
    </main>
  );

  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <ScrollToSection /> 
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={MainPage} />
        <Route path="/home" element={MainPage} />
        <Route path="/about" element={MainPage} />
        <Route path="/formations" element={MainPage} />
        <Route path="/contact" element={MainPage} />

        {/* ROUTES D'ADMINISTRATION (Vraies pages protégées) */}
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
        <Route path="/formations/:id" element={<FormationDetails />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;