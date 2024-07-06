import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function Results({ username }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('URL_DE_TU_AZURE_STORAGE');
      const workbook = XLSX.read(response.data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);
      const userData = json.filter(item => item.username === username);
      setData(userData);
    };

    fetchData();
  }, [username]);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.info}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;
