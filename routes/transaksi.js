const express = require('express');
const router = express.Router();
const { Transaksi } = require('../models'); // Pastikan model ini sudah tersedia dan benar

// Endpoint POST /api/transaksi/bayar
router.post('/bayar', async (req, res) => {
  try {
    const {
      nama_karya,
      nama,
      email,
      metode_pembayaran,
      status_pembayaran,
      gambar // Ambil dari frontend (gambar URL atau path)
    } = req.body;

    // Simpan transaksi ke database
    const transaksiBaru = await Transaksi.create({
      nama_karya,
      nama,
      email,
      metode_pembayaran,
      status_pembayaran,
      gambar
    });

    res.status(201).json({
      message: 'Transaksi berhasil disimpan',
      transaksi: transaksiBaru
    });
  } catch (error) {
    console.error('❌ Gagal menyimpan transaksi:', error);
    res.status(500).json({
      message: 'Gagal menyimpan transaksi',
      error: error.message
    });
  }
});

module.exports = router;
