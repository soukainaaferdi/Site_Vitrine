import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "../Styles/Formations.css"; 

function Actualites() {
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/actualites")
      .then(res => setActualites(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="formations-container" id="actualites" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
      <div className="text-center mb-5">
        <h1 className="title display-4 fw-bold mb-3">Nos Actualités</h1>
        <div style={{ width: "100px", height: "4px", backgroundColor: "#eea108", margin: "0 auto" }}></div>
      </div>

      <div className="cards-grid">
        {actualites.map(act => (
          <div className="card" key={act.id}>
            <img 
              src={act.image && act.image.startsWith('http') ? act.image : `http://127.0.0.1:8000/storage/${act.image}`} 
              className="card-image" 
              alt={act.titre} 
            />
            <div className="card-content">
              <h3 className="filiere">{act.titre}</h3>
              <p className="diplome">
                {act.description.length > 110 ? `${act.description.substring(0, 110)}...` : act.description}
              </p>
              {act.date && <p className="duree">Publié le : {act.date.split(' ')[0].split('-').reverse().join('/')}</p>}
              <Link to={`/actualites/${act.id}`} className="btn-link">Voir plus →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Actualites;