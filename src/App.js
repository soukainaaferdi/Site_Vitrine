import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
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
import NewsDashboard from "./pages/Dashbord/NewsDashboard";
import AddNews from "./pages/Dashbord/AddNews";
import EditNews from "./pages/Dashbord/EditNews";
import NotFound from "./pages/notFound";
import './Styles/App.css';

const ScrollToSection = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const sectionId = pathname.substring(1);
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return null;
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérification du token au démarrage
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        setIsAdmin(response.data.is_admin === true || response.data.is_admin === 1);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("is_admin");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Pendant la vérification, on n'affiche rien
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner-border" style={{ color: "#053F5C" }} role="status" />
      </div>
    );
  }

  const MainPage = (
    <main>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="formations"><Formations /></section>
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
        <Route path="/" element={MainPage} />
        <Route path="/home" element={MainPage} />
        <Route path="/about" element={MainPage} />
        <Route path="/formations" element={MainPage} />
        <Route path="/actualites" element={MainPage} />
        <Route path="/contact" element={MainPage} />

        <Route path="/actualites/:id" element={<ActualiteDetails />} />
        <Route path="/formations/:id" element={<FormationDetails />} />

        {/* Routes admin — NotFound si pas admin */}
        <Route path="/dashboard" element={isAdmin ? <NewsDashboard /> : <NotFound />} />
        <Route path="/create"    element={isAdmin ? <AddNews />       : <NotFound />} />
        <Route path="/edit/:id"  element={isAdmin ? <EditNews />      : <NotFound />} />

        <Route path="/admin-login" element={<Login />} />

        {/* URL inexistante */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;