const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getAllStudents, createStudent } = require('../controllers/studentController');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /api/students - Lấy danh sách sinh viên
router.get('/', limiter, getAllStudents);

// POST /api/students - Thêm sinh viên mới
router.post('/', limiter, createStudent);

module.exports = router;
