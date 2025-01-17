import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function Admin() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor, selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error al subir el archivo');
        }
    };

    const handleLogout = () => {
        navigate('/'); // Redirige a la página principal (Login)
    };

    return (
        <div className="admin-container">
            <h2>Subir archivo de incentivos</h2>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir</button>
            {message && <p>{message}</p>}
            <button className="logout-button" onClick={handleLogout}>Salir</button>
        </div>
    );
}

export default Admin;
