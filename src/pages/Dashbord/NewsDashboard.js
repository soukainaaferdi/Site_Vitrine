import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const NewsDashboard = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActualites = async () => {
        try{
          const response = await axios.get('http://127.0.0.1:8000/api/actualites');
          setNews(response.data); 
        }catch (error) {
          console.error("Error:", error);
        }
      };
      fetchActualites();
    }, []);


   const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette actualité ?")) {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://127.0.0.1:8000/api/actualites/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setNews(news.filter(item => item.id !== id));
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                alert("Erreur : Vous n'êtes pas autorisé à supprimer cette donnée.");
            } else {
                console.error("Erreur delete:", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    }
};


  return (
    <div>
      <Navbar />
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 mt-20">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Actualités</h1>
        <Link to="/create">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} /> Ajouter une nouvelle
        </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-3 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Titre</th>
              <th className="p-4">Description</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img src={`http://127.0.0.1:8000/storage/${item.image}`} className="w-16 h-10 object-cover rounded" alt="" />
                </td>
                <td className="p-4 font-medium">{item.titre}</td>
                <td className="p-4 text-gray-600">
                  {item.description.length > 50 ? item.description.substring(0, 50) +"..." : item.description }
                </td>
                <td className="p-4 text-gray-600">{item.created_at.split('T')[0]}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button onClick={() => navigate(`/edit/${item.id}`)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(item.id)}className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default NewsDashboard;