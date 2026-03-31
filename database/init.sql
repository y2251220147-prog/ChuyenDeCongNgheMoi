-- Tạo database
CREATE DATABASE IF NOT EXISTS myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE myapp;

-- Tạo bảng students
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    class VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mẫu
INSERT INTO students (name, student_id, class) VALUES
('Nguyễn Văn A', 'Y2251220147', 'CNPM-K18'),
('Trần Thị B', 'Y2251220148', 'CNPM-K18'),
('Lê Văn C', 'Y2251220149', 'CNPM-K18');
