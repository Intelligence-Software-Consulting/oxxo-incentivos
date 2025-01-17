import React, { useEffect, useState } from 'react';
import './Results.css';
import axios from 'axios';

function Results({ username }) {
  const [data, setData] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      setError('No se proporcionó un número de empleado.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`/incentivos/${username}`);
        setData(response.data);
        if (response.data.length > 0) {
          setEmployeeInfo(response.data[0]); // Tomamos la primera coincidencia para el nombre
        }
      } catch (err) {
        setError('No se encontraron incentivos para este empleado.');
      }
      setLoading(false);
    };

    fetchData();
  }, [username]);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="container">
      <h2>Desglose de incentivos por concursos a colaboradores</h2>
      
      {loading ? (
        <p>Cargando información...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : employeeInfo ? (
        <div>
          <button className="logout-button" onClick={handleLogout}>Salir</button>
          <p>Pago realizado en nómina del 24 de mayo 2024.</p>
          <div className="employee-info">
            <h3>{employeeInfo["Nombre Empleado"]}</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Número Empleado</th>
                <th>Denominación</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item["Número Empleado"]}</td>
                  <td>{item["Denominación"]}</td>
                  <td>${item["Importe"].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-container">
            <strong>Total:</strong> ${data.reduce((total, item) => total + item.Importe, 0).toFixed(2)}
          </div>
        </div>
      ) : (
        <p>No se encontraron datos para el empleado {username}.</p>
      )}
    </div>
  );
}

export default Results;
