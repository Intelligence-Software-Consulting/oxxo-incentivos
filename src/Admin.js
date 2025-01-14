import React, { useState } from 'react';
import './Admin.css';

function Admin() {
  const [file, setFile] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && startDate && endDate) {
      // Simula subir archivo
      alert(`Archivo subido: ${file.name}, desde ${startDate} hasta ${endDate}`);
      // Aquí podrías implementar la lógica para enviar el archivo al servidor
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha de Inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subir Archivo</label>
          <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        </div>
        <button type="submit">Subir</button>
      </form>
    </div>
  );
}

export default Admin;
