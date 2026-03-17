import React from 'react';
import { Toaster } from 'sonner';
import './App.css';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      <Toaster position="top-right" richColors />
       <Contact />
    </div>
  );
}

export default App;
