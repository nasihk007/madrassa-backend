-- ============================================
-- NOORUL YAKHEEN Madrassa Management System
-- Mock Data Script for PostgreSQL - FIXED VERSION
-- ============================================

-- First, let's see what's in the tables already
-- Clear existing data (in correct order to respect foreign keys)
TRUNCATE TABLE announcements CASCADE;
TRUNCATE TABLE exam_results CASCADE;
TRUNCATE TABLE prayers CASCADE;
TRUNCATE TABLE attendances CASCADE;
TRUNCATE TABLE students CASCADE;
TRUNCATE TABLE ustads CASCADE;
-- Keep class_divisions and academic_years since they already have data

-- ============================================
-- 3. USERS (Admin, Ustads, Students)
-- ============================================
-- Using simpler password hash that should work
-- Password: password123
-- Using a known bcrypt hash

-- ADMIN USER
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
(gen_random_uuid(), 'Ali Ahmed Faizy', 'ali.faizy@nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin', NOW(), NOW());

-- USTAD USERS (Teachers)
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
(gen_random_uuid(), 'Sheikh Nasih Faizy', 'nasih.faizy@nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'ustad', NOW(), NOW()),
(gen_random_uuid(), 'Maulana Ibrahim Hassan', 'ibrahim.hassan@nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'ustad', NOW(), NOW()),
(gen_random_uuid(), 'Ustadh Yusuf Rahman', 'yusuf.rahman@nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'ustad', NOW(), NOW()),
(gen_random_uuid(), 'Sheikh Omar Khalid', 'omar.khalid@nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'ustad', NOW(), NOW()),
(gen_random_uuid(), 'Maulana Bilal Mahmoud', 'bilal.mahmoud@nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'ustad', NOW(), NOW());

-- STUDENT USERS
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
(gen_random_uuid(), 'Ahmed Ibrahim Ali', 'ahmed.ibrahim@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Mohammed Hassan Saleh', 'mohammed.hassan@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Fatima Zahra Ahmad', 'fatima.zahra@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Aisha Noor Abdullah', 'aisha.noor@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Omar Farooq Yusuf', 'omar.farooq@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Khadija Maryam Hussain', 'khadija.maryam@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Abdullah Malik Rashid', 'abdullah.malik@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Zainab Safiya Ibrahim', 'zainab.safiya@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Hamza Tariq Siddiqui', 'hamza.tariq@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW()),
(gen_random_uuid(), 'Mariam Layla Karim', 'mariam.layla@student.nyhsm.edu', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', NOW(), NOW());

-- Get IDs for relationships (using CTEs)
-- ============================================
-- 4. USTADS (Teachers)
-- ============================================
WITH ustad_users AS (
  SELECT id, email FROM users WHERE role = 'ustad' ORDER BY email
)
INSERT INTO ustads (id, user_id, phone, specialization, qualification, joining_date, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  CASE
    WHEN email = 'bilal.mahmoud@nyhsm.edu' THEN '+971-50-123-4565'
    WHEN email = 'ibrahim.hassan@nyhsm.edu' THEN '+971-50-123-4562'
    WHEN email = 'nasih.faizy@nyhsm.edu' THEN '+971-50-123-4561'
    WHEN email = 'omar.khalid@nyhsm.edu' THEN '+971-50-123-4564'
    WHEN email = 'yusuf.rahman@nyhsm.edu' THEN '+971-50-123-4563'
  END,
  CASE
    WHEN email = 'bilal.mahmoud@nyhsm.edu' THEN 'Aqeedah & Tafsir'
    WHEN email = 'ibrahim.hassan@nyhsm.edu' THEN 'Hadith & Fiqh'
    WHEN email = 'nasih.faizy@nyhsm.edu' THEN 'Quran & Tajweed'
    WHEN email = 'omar.khalid@nyhsm.edu' THEN 'Islamic History'
    WHEN email = 'yusuf.rahman@nyhsm.edu' THEN 'Arabic Language'
  END,
  CASE
    WHEN email = 'bilal.mahmoud@nyhsm.edu' THEN 'PhD in Quranic Studies'
    WHEN email = 'ibrahim.hassan@nyhsm.edu' THEN 'PhD in Hadith Sciences, Al-Azhar University'
    WHEN email = 'nasih.faizy@nyhsm.edu' THEN 'Master in Islamic Studies, Ijazah in Qiraat'
    WHEN email = 'omar.khalid@nyhsm.edu' THEN 'MA in Islamic History & Civilization'
    WHEN email = 'yusuf.rahman@nyhsm.edu' THEN 'MA in Arabic Literature'
  END,
  CASE
    WHEN email = 'bilal.mahmoud@nyhsm.edu' THEN '2018-07-01'
    WHEN email = 'ibrahim.hassan@nyhsm.edu' THEN '2019-09-01'
    WHEN email = 'nasih.faizy@nyhsm.edu' THEN '2020-08-15'
    WHEN email = 'omar.khalid@nyhsm.edu' THEN '2020-03-20'
    WHEN email = 'yusuf.rahman@nyhsm.edu' THEN '2021-01-10'
  END::date,
  NOW(),
  NOW()
FROM ustad_users;

-- ============================================
-- 5. STUDENTS
-- ============================================
WITH student_users AS (
  SELECT id, email, ROW_NUMBER() OVER (ORDER BY email) as rn FROM users WHERE role = 'student'
),
classes AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY class_name, division) as rn FROM class_divisions
),
years AS (
  SELECT id FROM academic_years WHERE is_active = true LIMIT 1
)
INSERT INTO students (id, user_id, roll_number, phone, address, guardian_name, guardian_phone, admission_date, class_division_id, academic_year_id, created_at, updated_at)
SELECT
  gen_random_uuid(),
  su.id,
  'NYH-2024-' || LPAD(su.rn::text, 3, '0'),
  '+971-50-234-' || LPAD((5670 + su.rn)::text, 4, '0'),
  CASE su.rn
    WHEN 1 THEN 'Al Nahda, Dubai, UAE'
    WHEN 2 THEN 'Deira, Dubai, UAE'
    WHEN 3 THEN 'Sharjah, UAE'
    WHEN 4 THEN 'Ajman, UAE'
    WHEN 5 THEN 'Bur Dubai, UAE'
    WHEN 6 THEN 'Al Qusais, Dubai, UAE'
    WHEN 7 THEN 'Ras Al Khaimah, UAE'
    WHEN 8 THEN 'Fujairah, UAE'
    WHEN 9 THEN 'Al Barsha, Dubai, UAE'
    WHEN 10 THEN 'Umm Al Quwain, UAE'
  END,
  CASE su.rn
    WHEN 1 THEN 'Ibrahim Ali Mohammed'
    WHEN 2 THEN 'Hassan Saleh Ahmad'
    WHEN 3 THEN 'Ahmad Zahra Mahmoud'
    WHEN 4 THEN 'Abdullah Noor Hassan'
    WHEN 5 THEN 'Yusuf Farooq Ibrahim'
    WHEN 6 THEN 'Hussain Maryam Khalid'
    WHEN 7 THEN 'Rashid Malik Usman'
    WHEN 8 THEN 'Ibrahim Safiya Ahmed'
    WHEN 9 THEN 'Siddiqui Tariq Rahman'
    WHEN 10 THEN 'Karim Layla Bilal'
  END,
  '+971-50-999-' || LPAD(su.rn::text, 4, '0'),
  ('2024-06-' || (14 + su.rn))::date,
  c.id,
  y.id,
  NOW(),
  NOW()
FROM student_users su
CROSS JOIN years y
LEFT JOIN classes c ON c.rn = ((su.rn - 1) % 7) + 1;

-- ============================================
-- 6. ATTENDANCES
-- ============================================
WITH students_list AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY roll_number) as rn FROM students LIMIT 3
),
years AS (
  SELECT id FROM academic_years WHERE is_active = true LIMIT 1
),
ustads_list AS (
  SELECT user_id FROM ustads LIMIT 1
)
INSERT INTO attendances (id, student_id, date, status, marked_by, academic_year_id, notes, created_at, updated_at)
SELECT
  gen_random_uuid(),
  s.id,
  ('2024-10-' || LPAD(d::text, 2, '0'))::date,
  CASE
    WHEN d = 2 AND s.rn = 2 THEN 'absent'
    WHEN d = 3 AND s.rn = 1 THEN 'late'
    WHEN d = 4 AND s.rn = 3 THEN 'excused'
    ELSE 'present'
  END,
  u.user_id,
  y.id,
  CASE
    WHEN d = 2 AND s.rn = 2 THEN 'Medical appointment'
    WHEN d = 3 AND s.rn = 1 THEN 'Arrived 15 minutes late'
    WHEN d = 4 AND s.rn = 3 THEN 'Family emergency'
    ELSE NULL
  END,
  NOW(),
  NOW()
FROM students_list s
CROSS JOIN years y
CROSS JOIN ustads_list u
CROSS JOIN generate_series(1, 5) d;

-- ============================================
-- 7. PRAYERS
-- ============================================
WITH students_list AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY roll_number) as rn FROM students LIMIT 3
),
years AS (
  SELECT id FROM academic_years WHERE is_active = true LIMIT 1
),
ustads_list AS (
  SELECT user_id FROM ustads LIMIT 1
)
INSERT INTO prayers (id, student_id, date, fajr, dhuhr, asr, maghrib, isha, marked_by, academic_year_id, created_at, updated_at)
SELECT
  gen_random_uuid(),
  s.id,
  ('2024-10-' || LPAD(d::text, 2, '0'))::date,
  CASE WHEN d = 5 AND s.rn = 2 THEN false ELSE true END, -- fajr
  CASE WHEN d = 4 AND s.rn = 1 THEN false ELSE true END, -- dhuhr
  CASE WHEN d = 4 AND s.rn = 3 THEN false ELSE true END, -- asr
  CASE WHEN d = 2 AND s.rn = 2 THEN false ELSE true END, -- maghrib
  CASE WHEN d = 2 AND s.rn = 1 THEN false ELSE true END, -- isha
  u.user_id,
  y.id,
  NOW(),
  NOW()
FROM students_list s
CROSS JOIN years y
CROSS JOIN ustads_list u
CROSS JOIN generate_series(1, 5) d;

-- ============================================
-- 8. EXAM RESULTS
-- ============================================
WITH students_list AS (
  SELECT id, email, ROW_NUMBER() OVER (ORDER BY roll_number) as rn FROM students s JOIN users u ON s.user_id = u.id LIMIT 5
),
years AS (
  SELECT id FROM academic_years WHERE is_active = true LIMIT 1
),
subjects AS (
  SELECT * FROM (VALUES
    ('Quran Memorization', 50),
    ('Arabic Grammar', 50),
    ('Islamic Studies', 50),
    ('Hadith', 50),
    ('Fiqh', 50)
  ) AS s(name, total)
)
INSERT INTO exam_results (id, student_id, subject, marks, total_marks, exam_type, exam_date, grade, academic_year_id, created_at, updated_at)
SELECT
  gen_random_uuid(),
  st.id,
  sub.name,
  CASE
    WHEN st.rn = 3 THEN 45 + (sub_idx % 4) -- Fatima (excellent)
    WHEN st.rn = 1 THEN 40 + (sub_idx % 8) -- Ahmed (good)
    WHEN st.rn = 2 THEN 35 + (sub_idx % 10) -- Mohammed (average)
    WHEN st.rn = 4 THEN 41 + (sub_idx % 5) -- Aisha (good)
    ELSE 37 + (sub_idx % 6) -- Others
  END,
  sub.total,
  'Monthly Test',
  ('2024-09-' || (14 + sub_idx))::date,
  CASE
    WHEN (CASE
      WHEN st.rn = 3 THEN 45 + (sub_idx % 4)
      WHEN st.rn = 1 THEN 40 + (sub_idx % 8)
      WHEN st.rn = 2 THEN 35 + (sub_idx % 10)
      WHEN st.rn = 4 THEN 41 + (sub_idx % 5)
      ELSE 37 + (sub_idx % 6)
    END) >= 45 THEN 'A+'
    WHEN (CASE
      WHEN st.rn = 3 THEN 45 + (sub_idx % 4)
      WHEN st.rn = 1 THEN 40 + (sub_idx % 8)
      WHEN st.rn = 2 THEN 35 + (sub_idx % 10)
      WHEN st.rn = 4 THEN 41 + (sub_idx % 5)
      ELSE 37 + (sub_idx % 6)
    END) >= 42 THEN 'A'
    WHEN (CASE
      WHEN st.rn = 3 THEN 45 + (sub_idx % 4)
      WHEN st.rn = 1 THEN 40 + (sub_idx % 8)
      WHEN st.rn = 2 THEN 35 + (sub_idx % 10)
      WHEN st.rn = 4 THEN 41 + (sub_idx % 5)
      ELSE 37 + (sub_idx % 6)
    END) >= 38 THEN 'B+'
    ELSE 'B'
  END,
  y.id,
  NOW(),
  NOW()
FROM students_list st
CROSS JOIN years y
CROSS JOIN (SELECT name, total, ROW_NUMBER() OVER () - 1 as sub_idx FROM subjects) sub;

-- ============================================
-- 9. ANNOUNCEMENTS
-- ============================================
WITH admin_user AS (
  SELECT id FROM users WHERE role = 'admin' LIMIT 1
)
INSERT INTO announcements (id, title, content, visible_to, priority, created_by_id, created_at, updated_at)
SELECT
  gen_random_uuid(),
  title,
  content,
  visible_to,
  priority,
  admin_user.id,
  NOW(),
  NOW()
FROM admin_user
CROSS JOIN (VALUES
  ('Welcome to Academic Year 2024-2025', 'Assalamu Alaikum! We are pleased to welcome all students to the new academic year 2024-2025. May Allah bless your studies and grant you success in both Dunya and Akhirah.', 'all', 'high'),
  ('Ramadan Schedule Changes', 'Dear Students and Parents, during the blessed month of Ramadan, class timings will be adjusted. Morning classes will start at 9:00 AM and end at 1:00 PM. Evening Taraweeh prayers will be held at the madrassa.', 'all', 'high'),
  ('Quran Competition Next Month', 'We are organizing a Quran memorization competition for all students next month. Students who have memorized at least 5 Juz are encouraged to participate. Registration deadline: October 25, 2024.', 'student', 'medium'),
  ('Parent-Teacher Meeting', 'A parent-teacher meeting is scheduled for October 20, 2024, at 4:00 PM. All parents are requested to attend to discuss their child''s progress.', 'all', 'high'),
  ('Holiday Notice - Eid Al-Adha', 'The madrassa will be closed from June 15-20, 2024, for Eid Al-Adha holidays. Classes will resume on June 21, 2024. Eid Mubarak to all!', 'all', 'medium'),
  ('New Library Books Available', 'Alhamdulillah, we have received 50 new Islamic books for our library including Tafsir, Hadith, and Fiqh collections. Students can borrow books starting tomorrow.', 'student', 'low'),
  ('Teachers Training Workshop', 'All ustads are requested to attend the professional development workshop on Islamic pedagogy on October 15, 2024, at 2:00 PM in the main hall.', 'ustad', 'high'),
  ('Uniform Reminder', 'Dear Parents, please ensure your children wear the proper madrassa uniform daily. Boys: White thobe and kufi. Girls: Abaya and hijab.', 'all', 'medium'),
  ('Exam Schedule Released', 'The mid-term examination schedule for all classes has been uploaded. Please check the notice board or contact your class teacher for details.', 'student', 'high'),
  ('Jummah Prayer Arrangements', 'From next week, Jummah prayers will be held at the madrassa at 1:00 PM. All male students and staff are required to attend.', 'all', 'medium')
) AS announcements(title, content, visible_to, priority);

-- Show final counts
SELECT 'Data insertion completed!' as status;
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL SELECT 'students', COUNT(*) FROM students
UNION ALL SELECT 'ustads', COUNT(*) FROM ustads
UNION ALL SELECT 'class_divisions', COUNT(*) FROM class_divisions
UNION ALL SELECT 'academic_years', COUNT(*) FROM academic_years
UNION ALL SELECT 'attendances', COUNT(*) FROM attendances
UNION ALL SELECT 'prayers', COUNT(*) FROM prayers
UNION ALL SELECT 'exam_results', COUNT(*) FROM exam_results
UNION ALL SELECT 'announcements', COUNT(*) FROM announcements;
