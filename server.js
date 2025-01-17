const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 8080;

// 📁 Carpeta donde se guardará el archivo subido
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 📤 Configuración de Multer para la subida del archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, 'incentivos.xlsx'); // Siempre sobreescribir el archivo
    }
});
const upload = multer({ storage });

// 📌 Endpoint para subir el archivo de incentivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true, message: 'Archivo cargado correctamente' });
});

// 📌 Endpoint para obtener incentivos de un empleado por su número
app.get('/incentivos/:empleado', (req, res) => {
    const numeroEmpleado = parseInt(req.params.empleado, 10);
    const filePath = path.join(uploadDir, 'incentivos.xlsx');

    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'No hay archivo de incentivos cargado' });
    }

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const filteredData = data.filter(item => item["Número Empleado"] === numeroEmpleado);

    if (filteredData.length === 0) {
        return res.status(404).json({ error: 'No se encontraron incentivos para este empleado' });
    }

    res.json(filteredData);
});

// 📌 Servir archivos estáticos del build de React
app.use(express.static(path.join(__dirname, 'build')));

// 📌 Manejar todas las rutas desconocidas y servir `index.html` para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
