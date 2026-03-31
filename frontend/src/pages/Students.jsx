import React, { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = () => {
    setLoading(true);
    fetch(`${API_URL}/api/students`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải danh sách sinh viên');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>👨‍🎓 Danh sách sinh viên</h2>

      <StudentForm onAdded={fetchStudents} />

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#0066cc', color: '#fff' }}>
              <th style={th}>STT</th>
              <th style={th}>Họ và tên</th>
              <th style={th}>MSSV</th>
              <th style={th}>Lớp</th>
              <th style={th}>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                  Chưa có sinh viên nào
                </td>
              </tr>
            ) : (
              students.map((s, idx) => (
                <tr key={s.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={td}>{idx + 1}</td>
                  <td style={td}>{s.name}</td>
                  <td style={td}>{s.student_id}</td>
                  <td style={td}>{s.class}</td>
                  <td style={td}>{new Date(s.created_at).toLocaleDateString('vi-VN')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = { border: '1px solid #ccc', padding: '10px 14px', textAlign: 'left' };
const td = { border: '1px solid #ccc', padding: '8px 14px' };

export default Students;
