-- ============================================
-- NOORUL YAKHEEN Madrassa Management System
-- Mock Data Script for PostgreSQL
-- ============================================
-- This script populates all tables with realistic sample data
-- Execute this script in PostgreSQL database
-- ============================================

-- Clear existing data (in correct order to respect foreign keys)
TRUNCATE TABLE announcements CASCADE;
TRUNCATE TABLE exam_results CASCADE;
TRUNCATE TABLE prayers CASCADE;
TRUNCATE TABLE attendances CASCADE;
TRUNCATE TABLE students CASCADE;
TRUNCATE TABLE ustads CASCADE;
TRUNCATE TABLE class_divisions CASCADE;
TRUNCATE TABLE academic_years CASCADE;
TRUNCATE TABLE users CASCADE;

-- ============================================
-- 1. ACADEMIC YEARS (Foundation data)
-- ============================================
INSERT INTO academic_years (id, name, start_date, end_date, is_active, created_at, updated_at) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '2024-2025', '2024-06-01', '2025-05-31', true, NOW(), NOW()),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5e', '2023-2024', '2023-06-01', '2024-05-31', false, NOW(), NOW()),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5f', '2025-2026', '2025-06-01', '2026-05-31', false, NOW(), NOW());

-- ============================================
-- 2. CLASS DIVISIONS (Foundation data)
-- ============================================
INSERT INTO class_divisions (id, class_name, division, capacity, created_at, updated_at) VALUES
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'Class 1', 'A', 30, NOW(), NOW()),
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e60', 'Class 1', 'B', 30, NOW(), NOW()),
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e61', 'Class 2', 'A', 30, NOW(), NOW()),
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e62', 'Class 2', 'B', 30, NOW(), NOW()),
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e63', 'Class 3', 'A', 28, NOW(), NOW()),
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e64', 'Class 4', 'A', 28, NOW(), NOW()),
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e65', 'Class 5', 'A', 25, NOW(), NOW());

-- ============================================
-- 3. USERS (Admin, Ustads, Students)
-- ============================================
-- Password for all users: "password123" (hashed with bcrypt)
-- Hash: $2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km

-- ADMIN USER
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
('u0000000-0000-0000-0000-000000000001', 'Ali Ahmed Faizy', 'ali.faizy@nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'admin', NOW(), NOW());

-- USTAD USERS (Teachers)
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
('u1111111-1111-1111-1111-111111111111', 'Sheikh Nasih Faizy', 'nasih.faizy@nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'ustad', NOW(), NOW()),
('u1111111-1111-1111-1111-111111111112', 'Maulana Ibrahim Hassan', 'ibrahim.hassan@nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'ustad', NOW(), NOW()),
('u1111111-1111-1111-1111-111111111113', 'Ustadh Yusuf Rahman', 'yusuf.rahman@nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'ustad', NOW(), NOW()),
('u1111111-1111-1111-1111-111111111114', 'Sheikh Omar Khalid', 'omar.khalid@nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'ustad', NOW(), NOW()),
('u1111111-1111-1111-1111-111111111115', 'Maulana Bilal Mahmoud', 'bilal.mahmoud@nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'ustad', NOW(), NOW());

-- STUDENT USERS
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
('u2222222-2222-2222-2222-222222222221', 'Ahmed Ibrahim Ali', 'ahmed.ibrahim@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222222', 'Mohammed Hassan Saleh', 'mohammed.hassan@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222223', 'Fatima Zahra Ahmad', 'fatima.zahra@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222224', 'Aisha Noor Abdullah', 'aisha.noor@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222225', 'Omar Farooq Yusuf', 'omar.farooq@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222226', 'Khadija Maryam Hussain', 'khadija.maryam@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222227', 'Abdullah Malik Rashid', 'abdullah.malik@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222228', 'Zainab Safiya Ibrahim', 'zainab.safiya@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222229', 'Hamza Tariq Siddiqui', 'hamza.tariq@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW()),
('u2222222-2222-2222-2222-222222222230', 'Mariam Layla Karim', 'mariam.layla@student.nyhsm.edu', '$2a$10$XjKLHxZBz8qR9kO5YsN4MeZGqM5gM8vZHxF7qN4yP6hQ8sT2wU6Km', 'student', NOW(), NOW());

-- ============================================
-- 4. USTADS (Teachers) - References users and class_divisions
-- ============================================
INSERT INTO ustads (id, user_id, phone, specialization, qualification, joining_date, created_at, updated_at) VALUES
('t1111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', '+971-50-123-4561', 'Quran & Tajweed', 'Master in Islamic Studies, Ijazah in Qiraat', '2020-08-15', NOW(), NOW()),
('t1111111-1111-1111-1111-111111111112', 'u1111111-1111-1111-1111-111111111112', '+971-50-123-4562', 'Hadith & Fiqh', 'PhD in Hadith Sciences, Al-Azhar University', '2019-09-01', NOW(), NOW()),
('t1111111-1111-1111-1111-111111111113', 'u1111111-1111-1111-1111-111111111113', '+971-50-123-4563', 'Arabic Language', 'MA in Arabic Literature', '2021-01-10', NOW(), NOW()),
('t1111111-1111-1111-1111-111111111114', 'u1111111-1111-1111-1111-111111111114', '+971-50-123-4564', 'Islamic History', 'MA in Islamic History & Civilization', '2020-03-20', NOW(), NOW()),
('t1111111-1111-1111-1111-111111111115', 'u1111111-1111-1111-1111-111111111115', '+971-50-123-4565', 'Aqeedah & Tafsir', 'PhD in Quranic Studies', '2018-07-01', NOW(), NOW());

-- ============================================
-- 5. STUDENTS - References users, class_divisions, academic_years
-- ============================================
INSERT INTO students (id, user_id, roll_number, phone, address, guardian_name, guardian_phone, admission_date, class_division_id, academic_year_id, created_at, updated_at) VALUES
('s2222222-2222-2222-2222-222222222221', 'u2222222-2222-2222-2222-222222222221', 'NYH-2024-001', '+971-50-234-5671', 'Al Nahda, Dubai, UAE', 'Ibrahim Ali Mohammed', '+971-50-999-0001', '2024-06-15', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222222', 'u2222222-2222-2222-2222-222222222222', 'NYH-2024-002', '+971-50-234-5672', 'Deira, Dubai, UAE', 'Hassan Saleh Ahmad', '+971-50-999-0002', '2024-06-16', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222223', 'u2222222-2222-2222-2222-222222222223', 'NYH-2024-003', '+971-50-234-5673', 'Sharjah, UAE', 'Ahmad Zahra Mahmoud', '+971-50-999-0003', '2024-06-17', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e60', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222224', 'u2222222-2222-2222-2222-222222222224', 'NYH-2024-004', '+971-50-234-5674', 'Ajman, UAE', 'Abdullah Noor Hassan', '+971-50-999-0004', '2024-06-18', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e61', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222225', 'u2222222-2222-2222-2222-222222222225', 'NYH-2024-005', '+971-50-234-5675', 'Bur Dubai, UAE', 'Yusuf Farooq Ibrahim', '+971-50-999-0005', '2024-06-19', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e62', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222226', 'u2222222-2222-2222-2222-222222222226', 'NYH-2024-006', '+971-50-234-5676', 'Al Qusais, Dubai, UAE', 'Hussain Maryam Khalid', '+971-50-999-0006', '2024-06-20', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e63', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222227', 'u2222222-2222-2222-2222-222222222227', 'NYH-2024-007', '+971-50-234-5677', 'Ras Al Khaimah, UAE', 'Rashid Malik Usman', '+971-50-999-0007', '2024-06-21', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e64', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222228', 'u2222222-2222-2222-2222-222222222228', 'NYH-2024-008', '+971-50-234-5678', 'Fujairah, UAE', 'Ibrahim Safiya Ahmed', '+971-50-999-0008', '2024-06-22', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e65', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222229', 'u2222222-2222-2222-2222-222222222229', 'NYH-2024-009', '+971-50-234-5679', 'Al Barsha, Dubai, UAE', 'Siddiqui Tariq Rahman', '+971-50-999-0009', '2024-06-23', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('s2222222-2222-2222-2222-222222222230', 'u2222222-2222-2222-2222-222222222230', 'NYH-2024-010', '+971-50-234-5680', 'Umm Al Quwain, UAE', 'Karim Layla Bilal', '+971-50-999-0010', '2024-06-24', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e60', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW());

-- ============================================
-- 6. ATTENDANCES - References students and academic_years
-- ============================================
INSERT INTO attendances (id, student_id, date, status, marked_by, academic_year_id, notes, created_at, updated_at) VALUES
-- Ahmed Ibrahim Ali attendance
('at111111-1111-1111-1111-111111111111', 's2222222-2222-2222-2222-222222222221', '2024-10-01', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111112', 's2222222-2222-2222-2222-222222222221', '2024-10-02', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111113', 's2222222-2222-2222-2222-222222222221', '2024-10-03', 'late', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Arrived 15 minutes late', NOW(), NOW()),
('at111111-1111-1111-1111-111111111114', 's2222222-2222-2222-2222-222222222221', '2024-10-04', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111115', 's2222222-2222-2222-2222-222222222221', '2024-10-05', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),

-- Mohammed Hassan attendance
('at111111-1111-1111-1111-111111111121', 's2222222-2222-2222-2222-222222222222', '2024-10-01', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111122', 's2222222-2222-2222-2222-222222222222', '2024-10-02', 'absent', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Medical appointment', NOW(), NOW()),
('at111111-1111-1111-1111-111111111123', 's2222222-2222-2222-2222-222222222222', '2024-10-03', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111124', 's2222222-2222-2222-2222-222222222222', '2024-10-04', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111125', 's2222222-2222-2222-2222-222222222222', '2024-10-05', 'present', 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),

-- Fatima Zahra attendance
('at111111-1111-1111-1111-111111111131', 's2222222-2222-2222-2222-222222222223', '2024-10-01', 'present', 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111132', 's2222222-2222-2222-2222-222222222223', '2024-10-02', 'present', 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111133', 's2222222-2222-2222-2222-222222222223', '2024-10-03', 'present', 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW()),
('at111111-1111-1111-1111-111111111134', 's2222222-2222-2222-2222-222222222223', '2024-10-04', 'excused', 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Family emergency', NOW(), NOW()),
('at111111-1111-1111-1111-111111111135', 's2222222-2222-2222-2222-222222222223', '2024-10-05', 'present', 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NULL, NOW(), NOW());

-- ============================================
-- 7. PRAYERS - References students and academic_years
-- ============================================
INSERT INTO prayers (id, student_id, date, fajr, dhuhr, asr, maghrib, isha, marked_by, academic_year_id, created_at, updated_at) VALUES
-- Ahmed Ibrahim Ali prayers
('pr111111-1111-1111-1111-111111111111', 's2222222-2222-2222-2222-222222222221', '2024-10-01', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111112', 's2222222-2222-2222-2222-222222222221', '2024-10-02', true, true, true, true, false, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111113', 's2222222-2222-2222-2222-222222222221', '2024-10-03', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111114', 's2222222-2222-2222-2222-222222222221', '2024-10-04', true, false, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111115', 's2222222-2222-2222-2222-222222222221', '2024-10-05', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),

-- Mohammed Hassan prayers
('pr111111-1111-1111-1111-111111111121', 's2222222-2222-2222-2222-222222222222', '2024-10-01', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111122', 's2222222-2222-2222-2222-222222222222', '2024-10-02', true, true, true, false, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111123', 's2222222-2222-2222-2222-222222222222', '2024-10-03', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111124', 's2222222-2222-2222-2222-222222222222', '2024-10-04', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111125', 's2222222-2222-2222-2222-222222222222', '2024-10-05', false, true, true, true, true, 'u1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),

-- Fatima Zahra prayers
('pr111111-1111-1111-1111-111111111131', 's2222222-2222-2222-2222-222222222223', '2024-10-01', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111132', 's2222222-2222-2222-2222-222222222223', '2024-10-02', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111133', 's2222222-2222-2222-2222-222222222223', '2024-10-03', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111134', 's2222222-2222-2222-2222-222222222223', '2024-10-04', true, true, false, true, true, 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('pr111111-1111-1111-1111-111111111135', 's2222222-2222-2222-2222-222222222223', '2024-10-05', true, true, true, true, true, 'u1111111-1111-1111-1111-111111111112', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW());

-- ============================================
-- 8. EXAM_RESULTS - References students and academic_years
-- ============================================
INSERT INTO exam_results (id, student_id, subject, marks, total_marks, exam_type, exam_date, grade, academic_year_id, created_at, updated_at) VALUES
-- Ahmed Ibrahim Ali results
('ex111111-1111-1111-1111-111111111111', 's2222222-2222-2222-2222-222222222221', 'Quran Memorization', 45, 50, 'Monthly Test', '2024-09-15', 'A', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111112', 's2222222-2222-2222-2222-222222222221', 'Arabic Grammar', 38, 50, 'Monthly Test', '2024-09-16', 'B+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111113', 's2222222-2222-2222-2222-222222222221', 'Islamic Studies', 42, 50, 'Monthly Test', '2024-09-17', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111114', 's2222222-2222-2222-2222-222222222221', 'Hadith', 47, 50, 'Monthly Test', '2024-09-18', 'A+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111115', 's2222222-2222-2222-2222-222222222221', 'Fiqh', 40, 50, 'Monthly Test', '2024-09-19', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),

-- Mohammed Hassan results
('ex111111-1111-1111-1111-111111111121', 's2222222-2222-2222-2222-222222222222', 'Quran Memorization', 42, 50, 'Monthly Test', '2024-09-15', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111122', 's2222222-2222-2222-2222-222222222222', 'Arabic Grammar', 35, 50, 'Monthly Test', '2024-09-16', 'B', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111123', 's2222222-2222-2222-2222-222222222222', 'Islamic Studies', 44, 50, 'Monthly Test', '2024-09-17', 'A', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111124', 's2222222-2222-2222-2222-222222222222', 'Hadith', 40, 50, 'Monthly Test', '2024-09-18', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111125', 's2222222-2222-2222-2222-222222222222', 'Fiqh', 38, 50, 'Monthly Test', '2024-09-19', 'B+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),

-- Fatima Zahra results
('ex111111-1111-1111-1111-111111111131', 's2222222-2222-2222-2222-222222222223', 'Quran Memorization', 48, 50, 'Monthly Test', '2024-09-15', 'A+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111132', 's2222222-2222-2222-2222-222222222223', 'Arabic Grammar', 46, 50, 'Monthly Test', '2024-09-16', 'A+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111133', 's2222222-2222-2222-2222-222222222223', 'Islamic Studies', 47, 50, 'Monthly Test', '2024-09-17', 'A+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111134', 's2222222-2222-2222-2222-222222222223', 'Hadith', 45, 50, 'Monthly Test', '2024-09-18', 'A', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111135', 's2222222-2222-2222-2222-222222222223', 'Fiqh', 49, 50, 'Monthly Test', '2024-09-19', 'A+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),

-- Aisha Noor results
('ex111111-1111-1111-1111-111111111141', 's2222222-2222-2222-2222-222222222224', 'Quran Memorization', 43, 50, 'Monthly Test', '2024-09-15', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111142', 's2222222-2222-2222-2222-222222222224', 'Arabic Grammar', 41, 50, 'Monthly Test', '2024-09-16', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111143', 's2222222-2222-2222-2222-222222222224', 'Islamic Studies', 44, 50, 'Monthly Test', '2024-09-17', 'A', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111144', 's2222222-2222-2222-2222-222222222224', 'Hadith', 42, 50, 'Monthly Test', '2024-09-18', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111145', 's2222222-2222-2222-2222-222222222224', 'Fiqh', 45, 50, 'Monthly Test', '2024-09-19', 'A', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),

-- Omar Farooq results
('ex111111-1111-1111-1111-111111111151', 's2222222-2222-2222-2222-222222222225', 'Quran Memorization', 40, 50, 'Monthly Test', '2024-09-15', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111152', 's2222222-2222-2222-2222-222222222225', 'Arabic Grammar', 37, 50, 'Monthly Test', '2024-09-16', 'B+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111153', 's2222222-2222-2222-2222-222222222225', 'Islamic Studies', 41, 50, 'Monthly Test', '2024-09-17', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111154', 's2222222-2222-2222-2222-222222222225', 'Hadith', 39, 50, 'Monthly Test', '2024-09-18', 'B+', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW()),
('ex111111-1111-1111-1111-111111111155', 's2222222-2222-2222-2222-222222222225', 'Fiqh', 42, 50, 'Monthly Test', '2024-09-19', 'A-', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', NOW(), NOW());

-- ============================================
-- 9. ANNOUNCEMENTS - References users (created_by)
-- ============================================
INSERT INTO announcements (id, title, content, visible_to, priority, created_by_id, created_at, updated_at) VALUES
('an111111-1111-1111-1111-111111111111', 'Welcome to Academic Year 2024-2025', 'Assalamu Alaikum! We are pleased to welcome all students to the new academic year 2024-2025. May Allah bless your studies and grant you success in both Dunya and Akhirah.', 'all', 'high', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111112', 'Ramadan Schedule Changes', 'Dear Students and Parents, during the blessed month of Ramadan, class timings will be adjusted. Morning classes will start at 9:00 AM and end at 1:00 PM. Evening Taraweeh prayers will be held at the madrassa.', 'all', 'high', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111113', 'Quran Competition Next Month', 'We are organizing a Quran memorization competition for all students next month. Students who have memorized at least 5 Juz are encouraged to participate. Registration deadline: October 25, 2024.', 'student', 'medium', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111114', 'Parent-Teacher Meeting', 'A parent-teacher meeting is scheduled for October 20, 2024, at 4:00 PM. All parents are requested to attend to discuss their child''s progress.', 'all', 'high', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111115', 'Holiday Notice - Eid Al-Adha', 'The madrassa will be closed from June 15-20, 2024, for Eid Al-Adha holidays. Classes will resume on June 21, 2024. Eid Mubarak to all!', 'all', 'medium', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111116', 'New Library Books Available', 'Alhamdulillah, we have received 50 new Islamic books for our library including Tafsir, Hadith, and Fiqh collections. Students can borrow books starting tomorrow.', 'student', 'low', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111117', 'Teachers Training Workshop', 'All ustads are requested to attend the professional development workshop on Islamic pedagogy on October 15, 2024, at 2:00 PM in the main hall.', 'ustad', 'high', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111118', 'Uniform Reminder', 'Dear Parents, please ensure your children wear the proper madrassa uniform daily. Boys: White thobe and kufi. Girls: Abaya and hijab.', 'all', 'medium', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111119', 'Exam Schedule Released', 'The mid-term examination schedule for all classes has been uploaded. Please check the notice board or contact your class teacher for details.', 'student', 'high', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW()),
('an111111-1111-1111-1111-111111111120', 'Jummah Prayer Arrangements', 'From next week, Jummah prayers will be held at the madrassa at 1:00 PM. All male students and staff are required to attend.', 'all', 'medium', 'u0000000-0000-0000-0000-000000000001', NOW(), NOW());

-- ============================================
-- Verification Queries (Optional - for testing)
-- ============================================
-- SELECT COUNT(*) as total_users FROM users;
-- SELECT COUNT(*) as total_students FROM students;
-- SELECT COUNT(*) as total_ustads FROM ustads;
-- SELECT COUNT(*) as total_classes FROM class_divisions;
-- SELECT COUNT(*) as total_academic_years FROM academic_years;
-- SELECT COUNT(*) as total_attendance FROM attendances;
-- SELECT COUNT(*) as total_prayers FROM prayers;
-- SELECT COUNT(*) as total_results FROM exam_results;
-- SELECT COUNT(*) as total_announcements FROM announcements;

-- ============================================
-- Summary:
-- Users: 16 (1 Admin, 5 Ustads, 10 Students)
-- Students: 10
-- Ustads: 5
-- Class Divisions: 7
-- Academic Years: 3
-- Attendances: 15 records
-- Prayers: 15 records
-- Exam Results: 25 records
-- Announcements: 10
-- ============================================
