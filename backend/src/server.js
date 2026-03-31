require('dotenv').config();
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 5000;
const APP_NAME = process.env.APP_NAME || 'DevOps Mini Project';

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// About - thông tin sinh viên
app.get('/about', (req, res) => {
  res.json({
    appName: APP_NAME,
    student: {
      hoTen: 'Nguyễn Văn A',
      mssv: 'Y2251220147',
      lop: 'CNPM-K18'
    }
  });
});

// API routes
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`${APP_NAME} backend is running on port ${PORT}`);
});
