const bcrypt = require('bcryptjs');

// Test the password hashing and comparison
async function testPasswordHashing() {
  console.log('=== Testing Password Hashing ===');
  
  const password = '12345678';
  console.log('Original password:', password);
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);
  
  // Test comparison with correct password
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log('Correct password comparison:', isValid);
  
  // Test comparison with wrong password
  const isInvalid = await bcrypt.compare('wrongpassword', hashedPassword);
  console.log('Wrong password comparison:', isInvalid);
  
  console.log('');
}

// Test the registration and login flow
async function testRegistrationAndLogin() {
  console.log('=== Testing Registration and Login Flow ===');
  
  // Simulate registration
  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: '12345678',
    role: 'admin'
  };
  
  console.log('Registering user:', userData.email);
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  console.log('Password hashed during registration');
  
  // Simulate login
  console.log('Attempting login with:', userData.email);
  const isPasswordValid = await bcrypt.compare(userData.password, hashedPassword);
  console.log('Login password validation:', isPasswordValid);
  
  if (isPasswordValid) {
    console.log('✅ Login should succeed');
  } else {
    console.log('❌ Login should fail');
  }
  
  console.log('');
}

// Run tests
async function runTests() {
  await testPasswordHashing();
  await testRegistrationAndLogin();
  
  console.log('=== Troubleshooting Steps ===');
  console.log('1. Make sure PostgreSQL is running');
  console.log('2. Check if the user was actually created in the database');
  console.log('3. Verify the password hash in the database');
  console.log('4. Check the backend logs for any errors');
  console.log('5. Try registering a new user and then logging in');
}

runTests().catch(console.error);
