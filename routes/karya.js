const express = require('express');
const multer = require('multer');
const Karya = require('../models/karya');
const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload karya
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { nama, harga, kategori, deskripsi, lisensi } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File tidak ditemukan' });
    }

    const allowedKategori = ['3d', 'pemandangan', 'vintage'];
    const kategoriLower = kategori.toLowerCase();

    if (!allowedKategori.includes(kategoriLower)) {
      return res.status(400).json({ message: 'Kategori tidak valid (hanya 3d, pemandangan, vintage)' });
    }

    let finalLisensi = '';
    if (lisensi === 'Exclusive') {
      finalLisensi = 'eksklusif';
    } else if (lisensi === 'Non-Exclusive') {
      finalLisensi = 'non eksklusif';
    } else {
      return res.status(400).json({ message: 'Lisensi tidak valid' });
    }

    const newKarya = await Karya.create({
      nama,
      harga,
      kategori: kategoriLower, // disimpan lowercase
      deskripsi,
      lisensi: finalLisensi,
      file_path: req.file.path,
    });

    res.status(201).json({ message: 'Karya berhasil diupload', karya: newKarya });
  } catch (error) {
    console.error('Error upload karya:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

// Ambil karya (dengan filter kategori opsional)
router.get('/', async (req, res) => {
  try {
    const { kategori } = req.query;

    let queryOptions = {};
    if (kategori) {
      queryOptions.where = { kategori: kategori.toLowerCase() };
    }

    const karyas = await Karya.findAll(queryOptions);
    res.status(200).json(karyas);
  } catch (error) {
    console.error('Error fetching karya:', error);
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
});

module.exports = router;
