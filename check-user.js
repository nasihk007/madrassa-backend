const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Database configuration
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres123',
  database: 'madrassa_db',
});

async function checkUser() {
  try {
    const client = await pool.connect();
    
    // Check if user exists
    const result = await client.query(
      'SELECT id, name, email, password, role FROM users WHERE email = $1',
      ['aliusthad@gmail.com']
    );
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('User found:', {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        passwordHash: user.password.substring(0, 20) + '...'
      });
      
      // Test password comparison
      const testPassword = '12345678';
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log('Password comparison result:', isValid);
      
    } else {
      console.log('User not found in database');
    }
    
    client.release();
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await pool.end();
  }
}

checkUser();
