import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function About() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/about`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setError('Không thể kết nối tới backend'));
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!info) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <div>
      <h2>📋 Thông tin sinh viên</h2>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <tbody>
          <tr>
            <td style={tdLabel}>Họ và tên</td>
            <td style={tdValue}>{info.student.hoTen}</td>
          </tr>
          <tr>
            <td style={tdLabel}>MSSV</td>
            <td style={tdValue}>{info.student.mssv}</td>
          </tr>
          <tr>
            <td style={tdLabel}>Lớp</td>
            <td style={tdValue}>{info.student.lop}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const tdLabel = {
  border: '1px solid #ccc',
  padding: '10px 14px',
  fontWeight: 'bold',
  background: '#f5f5f5',
  width: '150px',
};

const tdValue = {
  border: '1px solid #ccc',
  padding: '10px 14px',
};

export default About;
