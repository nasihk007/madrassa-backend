const bcrypt = require('bcryptjs');

// Test password hashing and comparison
async function testPassword() {
  const password = '12345678';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log('Original password:', password);
  console.log('Hashed password:', hashedPassword);
  
  // Test comparison
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log('Password comparison result:', isValid);
  
  // Test with wrong password
  const isInvalid = await bcrypt.compare('wrongpassword', hashedPassword);
  console.log('Wrong password comparison result:', isInvalid);
}

testPassword().catch(console.error);
