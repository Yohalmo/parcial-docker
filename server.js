// server.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3000;
const HOST = '0.0.0.0';


const pool = new Pool({
  host: process.env.PGHOST || 'db',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || 'admin',
  password: process.env.PGPASSWORD || '12345',
  database: process.env.PGDATABASE || 'parcial_db',
  max: 10,
  idleTimeoutMillis: 30000,
});


const datosEstudiante = {
  nombre: 'Yohalmo Vásquez',
  codigo: 'vg20-i04-001',
  codigo: '24569',
  carrera: 'Ingeniería en Sistemas Computacionales',
};


app.get('/', (_req, res) => {
  res.json(datosEstudiante);
});


app.get('/health', async (_req, res) => {
  try {
    const r = await pool.query('SELECT 1 AS ok');
    if (r.rows?.[0]?.ok === 1) {
      return res.json({ status: 'OK', db: 'connected' });
    }
    return res.status(500).json({ status: 'ERROR', db: 'unexpected result' });
  } catch (err) {
    return res.status(500).json({ status: 'ERROR', db: 'disconnected', error: err.message });
  }
});


app.get('/estudiantes', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, nombre, carrera FROM estudiantes ORDER BY id ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error consultando estudiantes', detail: err.message });
  }
});


app.listen(PORT, HOST, () => {
  console.log(`API corriendo en http://${HOST}:${PORT}`);
});
