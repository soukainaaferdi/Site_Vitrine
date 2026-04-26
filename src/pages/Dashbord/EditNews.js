import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const EditNews = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        date: '',
        image: null
    });

    useEffect(() => {
        const fetchOldData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/actualites/${id}`);
                setFormData({
                    titre: res.data.titre,
                    description: res.data.description,
                    date: res.data.date,
                    image: null 
                });
            } catch (error) {
                console.error("Erreur fetching old data:", error);
            }
        };
        fetchOldData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors({});

    const token = localStorage.getItem('token'); // Récupération du token

    const dataToSend = new FormData();
    dataToSend.append('_method', 'PUT'); // Indispensable pour Laravel avec FormData
    dataToSend.append("titre", formData.titre);
    dataToSend.append("description", formData.description);
    dataToSend.append("date", formData.date);
    
    if (formData.image) {
        dataToSend.append("image", formData.image);
    }

    try {
        await axios.post(`http://127.0.0.1:8000/api/actualites/${id}`, dataToSend, { 
            headers: { 
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        });
        alert("Actualité modifiée avec succès !");
        navigate('/actualites');
    } catch (error) {
        if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors); 
        } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            alert("Accès refusé. Vérifiez que vous êtes bien connecté en tant qu'admin.");
        } else {
            console.error("Erreur lors de la mise à jour :", error);
        }
    }
};

    return (
        <div>
        <div className="p-8 max-w-2xl mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Modifier l'actualité</h1>
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-md">
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Titre</label>
                    <input  name="titre"  value={formData.titre}  onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.titre ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.titre && <p className="text-red-500 text-xs">{errors.titre[0]}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea  name="description"  value={formData.description}  onChange={handleChange}  rows="4"
                        className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`} >
                    </textarea>
                    {errors.description && <p className="text-red-500 text-xs">{errors.description[0]}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Date</label>
                    <input name="date" type="date" value={formData.date} onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.date && <p className="text-red-500 text-xs">{errors.date[0]}</p>}
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Image d'illustration</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="text-sm text-gray-500 font-medium">
                            {formData.image ? formData.image.name : "Cliquez pour uploader"}
                        </p>
                        </div>
                        <input name="image" type="file"  className="hidden" onChange={handleChange} />
                    </label>
                    {errors.image && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.image[0]}</p>}
                </div>
                <div className="flex gap-3 mt-3">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Enregistrer</button>
                    <button type="button" onClick={() => navigate('/')} className="bg-gray-300 px-6 py-2 rounded">Annuler</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default EditNews;