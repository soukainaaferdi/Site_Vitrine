import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8f9fa",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "8rem", fontWeight: "bold", color: "#053F5C", margin: 0, lineHeight: 1 }}>
        404
      </h1>
      <div style={{ height: "4px", width: "80px", background: "#F7AD19", borderRadius: "2px", margin: "1rem auto" }}></div>
      <h2 style={{ color: "#053F5C", fontSize: "1.5rem", marginBottom: "1rem" }}>
        Page introuvable
      </h2>
      <p style={{ color: "#666", fontSize: "1rem", maxWidth: "400px", marginBottom: "2rem" }}>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" style={{
        background: "#053F5C",
        color: "white",
        padding: "12px 30px",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "1rem"
      }}>
        ← Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;