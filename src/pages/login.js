import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/login.css";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Appel à ton API Laravel
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            });

            // On stocke les infos reçues de Laravel
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('is_admin', response.data.user.is_admin);

            // Redirection vers la page d'accueil
            navigate('/');
            
            // On force un petit rafraîchissement pour que la Navbar voie le changement
            window.location.reload(); 
        } catch (error) {
            alert("Erreur : Identifiants incorrects ou problème serveur");
        }
    };

return (
    <div className="login-minimal-wrapper">
        <div className="login-card">
            <div className="login-header">
                <h1>Portail ISAG</h1>
                <p>Administration OFPPT</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label>Email Professionnel</label>
                    <input 
                        type="email" 
                        placeholder="votre.nom@ofppt.ma"
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className="input-group">
                    <label>Mot de passe</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" className="btn-login-large">
                    Se connecter
                </button>
            </form>

            <div className="login-footer">
                <small>© 2026 OFPPT Casablanca</small>
            </div>
        </div>
    </div>
);
};

export default Login;