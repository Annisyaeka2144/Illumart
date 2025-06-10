const express = require('express');
const router = express.Router();
const Download = require('../models/download');
const Karya = require('../models/karya');

// POST /api/download/log
router.post('/log', async (req, res) => {
  try {
    const { nama_karya, email, karyaId } = req.body;

    if (!nama_karya || !email || !karyaId) {
      return res.status(400).json({ message: 'nama_karya, email, dan karyaId wajib diisi' });
    }

    const log = await Download.create({ nama_karya, email, karyaId });
    res.status(201).json({ message: 'Log download berhasil disimpan', log });
  } catch (error) {
    console.error('Error menyimpan log download:', error);
    res.status(500).json({ message: 'Gagal menyimpan log download', error: error.message });
  }
});

// GET /api/download/logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await Download.findAll({
      include: [{
        model: Karya,
        as: 'karya',
        attributes: ['nama', 'kategori', 'harga', 'file_path']
      }]
    });

    const result = logs.map(log => ({
      id: log.id,
      nama_karya: log.nama_karya,
      email: log.email,
      karya: log.karya ? {
        nama: log.karya.nama,
        kategori: log.karya.kategori,
        harga: log.karya.harga,
        gambar: `http://localhost:5000/uploads/${log.karya.file_path}`
      } : null
    }));

    res.json({ logs: result });
  } catch (error) {
    console.error('Gagal mengambil data downloads:', error);
    res.status(500).json({ message: 'Gagal mengambil data downloads' });
  }
});

module.exports = router;
