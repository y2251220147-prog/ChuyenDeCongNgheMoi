const db = require('../config/database');

// Lấy danh sách sinh viên
const getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách sinh viên' });
  }
};

// Thêm sinh viên mới
const createStudent = async (req, res) => {
  const { name, student_id, class: studentClass } = req.body;

  if (!name || !student_id || !studentClass) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin sinh viên' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO students (name, student_id, class) VALUES (?, ?, ?)',
      [name, student_id, studentClass]
    );
    const [newStudent] = await db.query('SELECT * FROM students WHERE id = ?', [result.insertId]);
    res.status(201).json(newStudent[0]);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Lỗi khi thêm sinh viên' });
  }
};

module.exports = { getAllStudents, createStudent };
