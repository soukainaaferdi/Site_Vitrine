import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Bach i-koun responsive wakha hna f fichi wahed
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- STYLES OBJECTS ---
  const styles = {
    heroSection: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/home.jpg')`,
      backgroundSize: isMobile ? 'contain' : 'cover',
      backgroundPosition: isMobile ? 'top center' : 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#053F5C',
      minHeight: isMobile ? '55vh' : '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingTop: isMobile ? '150px' : '0',
      transition: 'all 0.3s ease'
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '3.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#ffffff'
    },
    description: {
      fontSize: isMobile ? '0.9rem' : '1.2rem',
      maxWidth: '800px',
      margin: '0 auto 2rem auto',
      color: '#f8f9fa'
    },
    buttonContainer: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center'
    },
    mainBtn: {
      backgroundColor: '#eea108',
      color: '#071f2f',
      padding: '12px 35px',
      borderRadius: '50px',
      fontWeight: '600',
      textDecoration: 'none',
      width: isMobile ? '80%' : 'auto',
      textAlign: 'center',
      border: 'none'
    },
    secondaryBtn: {
      backgroundColor: 'transparent',
      border: '2px solid #ffffff',
      color: '#ffffff',
      padding: '12px 35px',
      borderRadius: '50px',
      fontWeight: '600',
      textDecoration: 'none',
      width: isMobile ? '80%' : 'auto',
      textAlign: 'center'
    }
  };

  return (
    <section style={styles.heroSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            
            <h1 style={styles.title}>
              Bienvenue à <span style={{ color: '#eea108' }}>l'ISAG</span> Casablanca
            </h1>

            <p style={styles.description}>
              Institut Spécialisé des Arts Graphiques. Développez vos compétences en design graphique, infographie et techniques d’impression de pointe.
            </p>

            <div style={styles.buttonContainer}>
              <Link to="/formations" style={styles.mainBtn}>
                Découvrir nos filières
              </Link>
              <Link to="/contact" style={styles.secondaryBtn}>
                Contactez-nous
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;