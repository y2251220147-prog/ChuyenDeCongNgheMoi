import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function StudentForm({ onAdded }) {
  const [form, setForm] = useState({ name: '', student_id: '', class: '' });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        setIsError(true);
        setMessage(err.error || 'Có lỗi xảy ra');
        return;
      }

      setIsError(false);
      setMessage('✅ Thêm sinh viên thành công!');
      setForm({ name: '', student_id: '', class: '' });
      if (onAdded) onAdded();
    } catch {
      setIsError(true);
      setMessage('Không thể kết nối tới server');
    }
  };

  return (
    <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '8px', maxWidth: '500px' }}>
      <h3 style={{ marginTop: 0 }}>➕ Thêm sinh viên mới</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Họ và tên:</label>
          <br />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>MSSV:</label>
          <br />
          <input
            name="student_id"
            value={form.student_id}
            onChange={handleChange}
            placeholder="Y2251220147"
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Lớp:</label>
          <br />
          <input
            name="class"
            value={form.class}
            onChange={handleChange}
            placeholder="CNPM-K18"
            required
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={{
            background: '#0066cc',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Thêm sinh viên
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '10px', color: isError ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '4px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
};

export default StudentForm;
