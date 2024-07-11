import React, { useEffect, useState } from 'react';
import './Results.css';

const employeeData = [
  { "Número Empleado": 1478562, "Nombre Empleado": "Mario Fortino Valencia", "Denominación": "Incentivo Venta Suge", "Importe": 80.10 },
  { "Número Empleado": 1478562, "Nombre Empleado": "Mario Fortino Valencia", "Denominación": "Con. Programa OPEN", "Importe": 33.04 },
  { "Número Empleado": 1511445, "Nombre Empleado": "Manuel Hernandez Martinez", "Denominación": "Incentivo Venta Suge", "Importe": 65.70 },
  { "Número Empleado": 1511445, "Nombre Empleado": "Manuel Hernandez Martinez", "Denominación": "Con. Programa OPEN", "Importe": 33.04 },
  { "Número Empleado": 7502196, "Nombre Empleado": "Lizeth Del Angel Del Angel", "Denominación": "Incentivo Venta Suge", "Importe": 33.30 },
  { "Número Empleado": 7502196, "Nombre Empleado": "Lizeth Del Angel Del Angel", "Denominación": "Con. Programa OPEN", "Importe": 82.60 },
  { "Número Empleado": 7505687, "Nombre Empleado": "Anna Regina Ramirez Esquivel", "Denominación": "Incentivo Venta Suge", "Importe": 37.35 },
  { "Número Empleado": 7508645, "Nombre Empleado": "Bertha Yadira Tovar Santacruz", "Denominación": "Incentivo Venta Suge", "Importe": 20.70 },
  { "Número Empleado": 7508645, "Nombre Empleado": "Bertha Yadira Tovar Santacruz", "Denominación": "Con. Programa OPEN", "Importe": 33.04 },
  { "Número Empleado": 7517801, "Nombre Empleado": "Estrella Aurora Martinez Antonio", "Denominación": "Con. Programa OPEN", "Importe": 33.04 },
  { "Número Empleado": 7525639, "Nombre Empleado": "Arnulfo Agustin Santiago", "Denominación": "Incentivo Venta Suge", "Importe": 63.00 },
  { "Número Empleado": 7525639, "Nombre Empleado": "Arnulfo Agustin Santiago", "Denominación": "Con. Programa OPEN", "Importe": 99.12 },
  { "Número Empleado": 7536317, "Nombre Empleado": "Edith Elizabeth Sanchez Niño", "Denominación": "Incentivo Venta Suge", "Importe": 0.50 },
  { "Número Empleado": 7536317, "Nombre Empleado": "Edith Elizabeth Sanchez Niño", "Denominación": "Con. Programa OPEN", "Importe": 66.08 },
  { "Número Empleado": 112172, "Nombre Empleado": "Gerardo Jesus Covarrubias Sanchez", "Denominación": "Con. Programa OPEN", "Importe": 141.60 },
  { "Número Empleado": 112770, "Nombre Empleado": "Edgar Miguel Medellin Herrera", "Denominación": "Con. Programa OPEN", "Importe": 33.04 },
  { "Número Empleado": 592911, "Nombre Empleado": "Victor Manuel Vazquez Velazquez", "Denominación": "Con. Programa OPEN", "Importe": 138.77 },
  { "Número Empleado": 634417, "Nombre Empleado": "Fredy Hernandez Castro", "Denominación": "Con. Programa OPEN", "Importe": 70.80 },
  { "Número Empleado": 1100187, "Nombre Empleado": "Luis Barrera Medina", "Denominación": "Con. Programa OPEN", "Importe": 113.28 },
  { "Número Empleado": 1102628, "Nombre Empleado": "Edgar Harol Cortes Garcia", "Denominación": "Con. Programa OPEN", "Importe": 42.48 },
  { "Número Empleado": 1102634, "Nombre Empleado": "Norberto Martin Torres Garcia", "Denominación": "Con. Programa OPEN", "Importe": 212.40 },
  { "Número Empleado": 1102653, "Nombre Empleado": "Jose Ignacio Silva Medellin", "Denominación": "Con. Programa OPEN", "Importe": 56.64 },
  { "Número Empleado": 1102668, "Nombre Empleado": "Humberto Garcia Quiroga", "Denominación": "Con. Programa OPEN", "Importe": 56.64 },
  { "Número Empleado": 1102671, "Nombre Empleado": "Gildardo Hernandez Lopez", "Denominación": "Con. Programa OPEN", "Importe": 28.32 }
];

function Results({ username }) {
  const [data, setData] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState(null);

  useEffect(() => {
    const userData = employeeData.filter(item => item["Número Empleado"] === parseInt(username));
    setData(userData);

    if (userData.length > 0) {
      setEmployeeInfo(userData[0]);
    }
  }, [username]);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="container">
      <h2>Desglose de incentivos por concursos a colaboradores</h2>
      {employeeInfo && (
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
      {!employeeInfo && <p>No se encontraron datos para el empleado {username}.</p>}
    </div>
  );
}

export default Results;
