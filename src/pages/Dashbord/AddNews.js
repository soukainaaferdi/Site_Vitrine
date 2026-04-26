import React, { useState } from 'react';
import { ImagePlus, Send, LayoutList } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date:'',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    console.log("State dyal l-form:", formData); 

    const dataToSend = new FormData();
        dataToSend.append("titre", formData.titre);
        dataToSend.append("description", formData.description);
        dataToSend.append("date", formData.date);
        
    if (formData.image) {
        dataToSend.append("image", formData.image);
    }

 try {
    // 1. On récupère le token stocké lors du login
    const token = localStorage.getItem('token');

    const response = await axios.post('http://127.0.0.1:8000/api/actualites', dataToSend, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            // 2. On l'ajoute ici pour que Laravel te reconnaisse
            'Authorization': `Bearer ${token}` 
        }
    });

    console.log("Success:", response.data);
    alert("Actualité ajoutée avec succès !");
    navigate('/actualites');
} catch (error) {
    if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
    } else if (error.response && error.response.status === 401) {
        alert("Session expirée ou non autorisée. Reconnectez-vous.");
    } else {
        console.error(error);
    }
}
};

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center mt-20">
      
      {/* Header section */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800">Nouvelle Actualité</h1>
        <Link to="/" className="flex items-center gap-2 text-blue-600 hover:underline">
          <LayoutList size={20} /> Dashboard
        </Link>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Input Titre */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Titre</label>
            <input  name="titre" type="text"  onChange={handleChange}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-transparent "
              placeholder="Ex: Nouveau module à l'ISAG..."
            />
            {errors.titre && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.titre[0]}</p>}
          </div>

          {/* Input Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Description</label>
            <textarea 
              name="description" rows="5" onChange={handleChange}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-transparent "
              placeholder="Détails de l'info..."
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.description[0]}</p>}
          </div>
          {/* Input Date */}
           <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Date</label>
            <input  name="date" type="Date"  onChange={handleChange}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-transparent "
            />
            {errors.date && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.date[0]}</p>}
          </div>

          {/* Input Image Design */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Image d'illustration</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="text-gray-400 mb-2" size={28} />
                <p className="text-sm text-gray-500 font-medium">
                   {formData.image ? formData.image.name : "Cliquez pour uploader"}
                </p>
              </div>
              <input name="image" type="file" className="hidden" onChange={handleChange} />
            </label>
            {errors.image && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.image[0]}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-3 transform active:scale-95 transition-all mt-4"
          >
            <Send size={20} /> Enregistrer
          </button>

        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AddNews;