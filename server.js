const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 8080;

console.log("🔥 Servidor iniciando...");

// Verificar y crear directorio de subida en Azure
const uploadDir = '/tmp/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`📁 Carpeta creada: ${uploadDir}`);
} else {
    console.log(`✅ Carpeta existente: ${uploadDir}`);
}

// Configurar `multer`
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, 'incentivos.xlsx');  // Siempre sobrescribimos el archivo
    }
});
const upload = multer({ storage: storage });

// Almacenamiento en memoria de incentivos
let incentivosData = [];

// Ruta para subir archivos y procesarlos
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.error("⚠️ No se recibió ningún archivo");
        return res.status(400).json({ error: "Error al subir el archivo" });
    }

    console.log(`📂 Archivo recibido: ${req.file.originalname}`);

    // Leer y procesar el archivo XLSX
    try {
        const filePath = path.join(uploadDir, 'incentivos.xlsx');
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        incentivosData = XLSX.utils.sheet_to_json(worksheet);
        
        console.log(`✅ Incentivos cargados en memoria (${incentivosData.length} registros).`);
        res.json({ message: "Archivo subido y procesado exitosamente", dataCount: incentivosData.length });
    } catch (error) {
        console.error("❌ Error al procesar el archivo:", error);
        res.status(500).json({ error: "Error al procesar el archivo" });
    }
});

// Ruta para obtener incentivos por número de empleado
app.get('/incentivos/:username', (req, res) => {
    const username = parseInt(req.params.username);
    console.log(`🔍 Buscando incentivos para el empleado: ${username}`);

    if (isNaN(username)) {
        return res.status(400).json({ error: "Número de empleado inválido" });
    }

    const filteredData = incentivosData.filter(item => item["Número Empleado"] === username);

    if (filteredData.length === 0) {
        console.log("⚠️ No se encontraron incentivos.");
        return res.status(404).json([]);
    }

    res.json(filteredData);
});

// Servir React App
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
