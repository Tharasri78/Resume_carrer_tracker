const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api/auth';

async function testAPI() {
  console.log('🔍 Testing API endpoints...\n');

  // Test 1: Register a new user
  console.log('1️⃣ Testing Registration...');
  try {
    const registerRes = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const registerData = await registerRes.json();
    console.log('Status:', registerRes.status);
    console.log('Response:', registerData);
    
    if (registerRes.ok) {
      console.log('✅ Registration successful!\n');
      
      // Test 2: Login with the same user
      console.log('2️⃣ Testing Login...');
      const loginRes = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });

      const loginData = await loginRes.json();
      console.log('Status:', loginRes.status);
      console.log('Response:', loginData);
      
      if (loginRes.ok) {
        console.log('✅ Login successful!\n');
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();