import React from 'react';
import { Toaster } from 'sonner';
import './App.css';
import Contact from './pages/Contact';
import Home from './pages/Home';
import About from './pages/About'

function App() {
  return (
    <div>
      <Toaster position="top-right" richColors />


    
       {/* Navbar */}
     
      {/* Hero Section */}
      <Home />
      {/* About / Presentation */}
      <About />
      {/* Contact  */}
       <Contact />
      {/* Footer */}
      
    </div>
  );
}

export default App;
