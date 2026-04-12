import React from 'react';
import '../Styles/Home.css';

const Home = () => {
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/home.jpg')`,
  };

  return (
    <section className="hero-section" style={sectionStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-white text-center">
            <div className="hero-content-wrapper">               
              <h1 className="display-3 fw-bold mb-4">
                Bienvenue à <span style={{ color: '#eea108' }}>l'ISAG</span> Casablanca
              </h1>
              <p className="lead mb-5">
                Institut Spécialisé des Arts Graphiques. Développez vos compétences en design graphique, infographie et techniques d’impression de pointe.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-sm-row flex-column align-items-center">
                <a href="#formations" className="hero-btn main-btn">
                  Découvrir nos filières
                </a>
                <a href="#contact" className="hero-btn secondary-btn">
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;