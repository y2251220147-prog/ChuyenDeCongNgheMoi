import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About.jsx';
import Students from './pages/Students.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setHealthStatus(data.status))
      .catch(() => setHealthStatus('error'));
  }, []);

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <header style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>🎓 DevOps Mini Project</h1>
          <nav style={{ marginTop: '10px' }}>
            <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#0066cc' }}>
              Trang chủ
            </Link>
            <Link to="/about" style={{ marginRight: '20px', textDecoration: 'none', color: '#0066cc' }}>
              Thông tin sinh viên
            </Link>
            <Link to="/students" style={{ textDecoration: 'none', color: '#0066cc' }}>
              Danh sách sinh viên
            </Link>
          </nav>
          <p style={{ marginTop: '8px', fontSize: '14px' }}>
            Health:{' '}
            <span style={{ color: healthStatus === 'ok' ? 'green' : 'red', fontWeight: 'bold' }}>
              {healthStatus ? `{ "status": "${healthStatus}" }` : 'Đang kiểm tra...'}
            </span>
          </p>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Chào mừng đến với DevOps Mini Project</h2>
                <p>Ứng dụng quản lý thông tin sinh viên sử dụng Node.js, React và MySQL.</p>
                <ul>
                  <li>
                    <Link to="/about">Xem thông tin sinh viên</Link>
                  </li>
                  <li>
                    <Link to="/students">Quản lý danh sách sinh viên</Link>
                  </li>
                </ul>
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
