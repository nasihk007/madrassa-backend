-- NOORUL YAKHEEN Madrassa Management System
-- Database Setup Script

-- Create database (run this separately if needed)
-- CREATE DATABASE madrassa_db;

-- Connect to the database
-- \c madrassa_db;

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'ustad', 'student');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
CREATE TYPE announcement_visibility AS ENUM ('all', 'admin', 'ustad', 'student');
CREATE TYPE announcement_priority AS ENUM ('low', 'medium', 'high');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create academic_years table
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create class_divisions table
CREATE TABLE class_divisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_name VARCHAR(20) NOT NULL,
    division VARCHAR(5) NOT NULL,
    capacity INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    guardian_name VARCHAR(100) NOT NULL,
    guardian_phone VARCHAR(20) NOT NULL,
    admission_date DATE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    class_division_id UUID REFERENCES class_divisions(id),
    academic_year_id UUID REFERENCES academic_years(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ustads table
CREATE TABLE ustads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    specialization VARCHAR(200) NOT NULL,
    qualification VARCHAR(200) NOT NULL,
    joining_date DATE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ustad_class_assignments table (Many-to-Many relationship)
CREATE TABLE ustad_class_assignments (
    ustad_id UUID REFERENCES ustads(id) ON DELETE CASCADE,
    class_division_id UUID REFERENCES class_divisions(id) ON DELETE CASCADE,
    PRIMARY KEY (ustad_id, class_division_id)
);

-- Create attendances table
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    status attendance_status DEFAULT 'present',
    notes TEXT,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    marked_by_id UUID REFERENCES ustads(id),
    academic_year_id UUID REFERENCES academic_years(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create prayers table
CREATE TABLE prayers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    fajr BOOLEAN DEFAULT false,
    dhuhr BOOLEAN DEFAULT false,
    asr BOOLEAN DEFAULT false,
    maghrib BOOLEAN DEFAULT false,
    isha BOOLEAN DEFAULT false,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    marked_by_id UUID REFERENCES ustads(id),
    academic_year_id UUID REFERENCES academic_years(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create exam_results table
CREATE TABLE exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(100) NOT NULL,
    marks INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    exam_type VARCHAR(50) NOT NULL,
    exam_date DATE NOT NULL,
    grade VARCHAR(5),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    marked_by_id UUID REFERENCES ustads(id),
    academic_year_id UUID REFERENCES academic_years(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    visible_to announcement_visibility DEFAULT 'all',
    priority announcement_priority DEFAULT 'medium',
    created_by_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_roll_number ON students(roll_number);
CREATE INDEX idx_ustads_email ON ustads(email);
CREATE INDEX idx_attendances_date ON attendances(date);
CREATE INDEX idx_attendances_student_id ON attendances(student_id);
CREATE INDEX idx_prayers_date ON prayers(date);
CREATE INDEX idx_prayers_student_id ON prayers(student_id);
CREATE INDEX idx_exam_results_student_id ON exam_results(student_id);
CREATE INDEX idx_exam_results_subject ON exam_results(subject);
CREATE INDEX idx_announcements_created_at ON announcements(created_at);

-- Insert initial data

-- Insert academic years
INSERT INTO academic_years (name, start_date, end_date, is_active) VALUES
('2024-2025', '2024-06-01', '2025-03-31', true),
('2023-2024', '2023-06-01', '2024-03-31', false),
('2022-2023', '2022-06-01', '2023-03-31', false);

-- Insert class divisions
INSERT INTO class_divisions (class_name, division, capacity) VALUES
('Class 1', 'A', 30), ('Class 1', 'B', 30),
('Class 2', 'A', 32), ('Class 2', 'B', 32),
('Class 3', 'A', 35), ('Class 3', 'B', 35),
('Class 4', 'A', 35), ('Class 4', 'B', 35),
('Class 5', 'A', 38), ('Class 5', 'B', 38),
('Class 6', 'A', 40), ('Class 6', 'B', 40),
('Class 7', 'A', 42), ('Class 7', 'B', 42),
('Class 8', 'A', 45), ('Class 8', 'B', 45),
('Class 9', 'A', 45), ('Class 9', 'B', 45),
('Class 10', 'A', 48), ('Class 10', 'B', 48),
('Class 11', 'A', 40), ('Class 11', 'B', 40),
('Class 12', 'A', 35), ('Class 12', 'B', 35);

-- Insert admin user
INSERT INTO users (name, email, password, role) VALUES
('Ali Faizy', 'ali.faizy@nyhsm.edu', '$2a$10$rQZ8K9mN2pL1vX3yU6wQ7eR4tY5uI8oP9aB2cD3eF4gH5iJ6kL7mN8oP9qR', 'admin');

-- Insert sample ustad users
INSERT INTO users (name, email, password, role) VALUES
('Nasih Faizy', 'nasih.faizy@nyhsm.edu', '$2a$10$rQZ8K9mN2pL1vX3yU6wQ7eR4tY5uI8oP9aB2cD3eF4gH5iJ6kL7mN8oP9qR', 'ustad'),
('Abdullah Baqavi', 'abdullah.baqavi@nyhsm.edu', '$2a$10$rQZ8K9mN2pL1vX3yU6wQ7eR4tY5uI8oP9aB2cD3eF4gH5iJ6kL7mN8oP9qR', 'ustad');

-- Insert sample student users
INSERT INTO users (name, email, password, role) VALUES
('Ahmed Ibrahim', 'ahmed.ibrahim@student.nyhsm.edu', '$2a$10$rQZ8K9mN2pL1vX3yU6wQ7eR4tY5uI8oP9aB2cD3eF4gH5iJ6kL7mN8oP9qR', 'student'),
('Fatima Zahra', 'fatima.zahra@student.nyhsm.edu', '$2a$10$rQZ8K9mN2pL1vX3yU6wQ7eR4tY5uI8oP9aB2cD3eF4gH5iJ6kL7mN8oP9qR', 'student');

-- Insert ustads
INSERT INTO ustads (name, email, phone, specialization, qualification, joining_date, user_id) VALUES
('Nasih Faizy', 'nasih.faizy@nyhsm.edu', '+91 9876543211', 'Arabic Language & Literature', 'MA Arabic Literature, Diploma in Translation', '2021-06-01', (SELECT id FROM users WHERE email = 'nasih.faizy@nyhsm.edu')),
('Abdullah Baqavi', 'abdullah.baqavi@nyhsm.edu', '+91 9876543212', 'Quran & Tajweed', 'Hafiz-e-Quran, Tajweed Specialist, Qira''at Certificate', '2019-06-01', (SELECT id FROM users WHERE email = 'abdullah.baqavi@nyhsm.edu'));

-- Insert students
INSERT INTO students (name, email, phone, address, roll_number, guardian_name, guardian_phone, admission_date, user_id, class_division_id, academic_year_id) VALUES
('Ahmed Ibrahim', 'ahmed.ibrahim@student.nyhsm.edu', '+91 9876543220', 'Kozhikode, Kerala 673001', '12A001', 'Ibrahim Ali Hasan', '+91 9876543221', '2024-06-01', (SELECT id FROM users WHERE email = 'ahmed.ibrahim@student.nyhsm.edu'), (SELECT id FROM class_divisions WHERE class_name = 'Class 12' AND division = 'A'), (SELECT id FROM academic_years WHERE is_active = true)),
('Fatima Zahra', 'fatima.zahra@student.nyhsm.edu', '+91 9876543222', 'Malappuram, Kerala 676121', '12A002', 'Mohammed Zahra', '+91 9876543223', '2024-06-01', (SELECT id FROM users WHERE email = 'fatima.zahra@student.nyhsm.edu'), (SELECT id FROM class_divisions WHERE class_name = 'Class 12' AND division = 'A'), (SELECT id FROM academic_years WHERE is_active = true));

-- Insert sample announcements
INSERT INTO announcements (title, content, visible_to, priority, created_by_id) VALUES
('Winter Break Notice', 'The madrassa will be closed for winter break from December 20th to January 5th. Classes will resume on January 6th, 2025.', 'all', 'high', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Mid-term Exam Results Published', 'Mid-term examination results for all classes have been published. Students can view their results in the results section.', 'student', 'medium', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Staff Meeting - Monday', 'All ustads are required to attend the weekly staff meeting on Monday, December 9th at 2:00 PM in the main hall.', 'ustad', 'medium', (SELECT id FROM users WHERE role = 'admin' LIMIT 1));

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_academic_years_updated_at BEFORE UPDATE ON academic_years FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_class_divisions_updated_at BEFORE UPDATE ON class_divisions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ustads_updated_at BEFORE UPDATE ON ustads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendances_updated_at BEFORE UPDATE ON attendances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayers_updated_at BEFORE UPDATE ON prayers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exam_results_updated_at BEFORE UPDATE ON exam_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;

COMMIT;

