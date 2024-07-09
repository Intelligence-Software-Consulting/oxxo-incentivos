import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './Results.css';

function Results({ username }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('URL_DE_TU_AZURE_STORAGE', { responseType: 'arraybuffer' });
      const workbook = XLSX.read(new Uint8Array(response.data), { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);
      const userData = json.filter(item => item.username === username);
      setData(userData);
    };

    fetchData();
  }, [username]);

  return (
    <div className="results-container">
      <h2>Incentivos de {username}</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Incentivo</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.incentivo}</td>
              <td>{item.descripcion}</td>
              <td>{item.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
