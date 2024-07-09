import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './Results.css';

function Results({ username }) {
  const [data, setData] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('URL_DE_TU_AZURE_STORAGE', { responseType: 'arraybuffer' });
        const workbook = XLSX.read(new Uint8Array(response.data), { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const userData = json.filter(item => item.username === username);
        setData(userData);

        if (userData.length > 0) {
          setEmployeeInfo(userData[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="results-container">
      {employeeInfo && (
        <div>
          <button className="logout-button" onClick={handleLogout}>Salir</button>
          <p>Pago realizado en nómina del 24 de mayo 2024.</p>
          <h3>{employeeInfo["Nombre Empleado"]}</h3>
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
                  <td>{item["Importe"].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-container">
            Total: ${data.reduce((total, item) => total + item.Importe, 0).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
