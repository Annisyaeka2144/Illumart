const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Karya = sequelize.define('Karya', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lisensi: {
    type: DataTypes.ENUM('eksklusif', 'non eksklusif'),
    allowNull: false,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'karyas',
  timestamps: true,
});

sequelize.sync().then(() => {
  console.log("Tabel 'Karyas' telah berhasil dibuat!");
});

module.exports = Karya;
