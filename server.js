const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    nombre: 'Yohalmo Alexander Vásquez Garcia',
    codigo: 'VG20-I04-001',
    expediente: '24569',
    carrera: 'Ingeniería en Sistemas Computacionales'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
