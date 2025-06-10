const { Sequelize } = require('sequelize');

// Koneksi ke database menggunakan Sequelize
const sequelize = new Sequelize('illumart', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // optional: supaya log query nggak muncul
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database.');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

module.exports = { sequelize, connectDB };
