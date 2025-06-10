module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    nama_karya: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metode_pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true, // ✅ Gambar bisa kosong (opsional)
    },
  }, {
    tableName: 'Transaksis', // ✅ Optional: pastikan sesuai nama tabel di DB jika perlu
    timestamps: true, // ✅ Untuk createdAt & updatedAt
  });

  return Transaksi;
};
