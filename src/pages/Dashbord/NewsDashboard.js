import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NewsDashboard = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/actualites');
        setNews(response.data); 
      } catch (error) {
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
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* رأس الصفحة مع الزر */}
      <div className="flex justify-between items-center mb-6 mt-20">
        <h1 className="text-2xl font-bold" style={{ color: '#053F5C' }}>Gestion des Actualités</h1>
        <Link to="/create">
          <button className="text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#004080' }}>
            <Plus size={18} /> Ajouter une nouvelle
          </button>
        </Link>
      </div>

      {/* الجدول بتصميم مطابق لجدول الـ Formations */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* الخلفية الزرقاء الداكنة للعناوين بحال الـ Formations */}
            <tr style={{ backgroundColor: '#004080' }}>
              <th className="p-4 text-white font-semibold text-sm uppercase tracking-wider">Image</th>
              <th className="p-4 text-white font-semibold text-sm uppercase tracking-wider">Titre</th>
              <th className="p-4 text-white font-semibold text-sm uppercase tracking-wider">Description</th>
              <th className="p-4 text-white font-semibold text-sm uppercase tracking-wider">Date</th>
              <th className="p-4 text-white font-semibold text-sm uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {news.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-8 text-gray-400 font-medium">Aucune actualité disponible.</td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                  {/* خانة الصورة */}
                  <td className="p-4">
                    {item.image && (
                      <img 
                        src={item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000/storage/${item.image}`} 
                        className="w-20 h-12 object-cover rounded-lg border border-gray-200 shadow-sm" 
                        alt="" 
                      />
                    )}
                  </td>
                  
                  {/* خانة العنوان ملون وعريض */}
                  <td className="p-4 font-bold text-gray-900" style={{ color: '#053F5C', minWidth: '160px' }}>
                    {item.titre}
                  </td>
                  
                  {/* خانة الوصف مقطوعة باحترافية */}
                  <td className="p-4 text-gray-600 text-sm max-w-xs truncate">
                    {item.description}
                  </td>
                  
                  {/* خانة التاريخ منسقة صحيحة */}
                  <td className="p-4 text-gray-500 text-sm font-medium whitespace-nowrap">
                    {item.date ? item.date.split(' ')[0].split('-').reverse().join('/') : (item.created_at?.split('T')[0].split('-').reverse().join('/') || '—')}
                  </td>
                  
                  {/* خانة الأزرار الملونة والمصممة بحال الـ Formations */}
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      {/* زر التعديل الأزرق */}
                      <button 
                        onClick={() => navigate(`/edit/${item.id}`)} 
                        className="text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all hover:bg-opacity-90 shadow-sm"
                        style={{ backgroundColor: '#004080' }}
                      >
                        <Edit size={14} /> Modifier
                      </button>
                      
                      {/* زر الحذف الأحمر */}
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all hover:bg-red-700 shadow-sm"
                      >
                        <Trash2 size={14} /> Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsDashboard;