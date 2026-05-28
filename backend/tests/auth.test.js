const request = require('supertest');
const fs = require('fs');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'yojana_setu_super_secret_key_2026';
}

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

describe('Auth Routes Integration Tests', () => {
  let app;
  let originalUsersData = '';
  let testUserToken = '';

  beforeAll(() => {
    // 1. Back up users.json
    if (fs.existsSync(USERS_FILE)) {
      originalUsersData = fs.readFileSync(USERS_FILE, 'utf-8');
    } else {
      originalUsersData = '[]';
    }

    // 2. Setup a clean test users database
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));

    // 3. Create Express app
    app = express();
    app.use(express.json());
    app.use('/api/auth', require('../routes/auth'));
  });

  afterAll(() => {
    // Restore original users.json
    fs.writeFileSync(USERS_FILE, originalUsersData);
  });

  describe('POST /api/auth/register', () => {
    test('should fail if name, email, or password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('required');
    });

    test('should fail if password is less than 6 characters', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User', email: 'test@example.com', password: '123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('at least 6 characters');
    });

    test('should successfully register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.name).toBe('Test User');
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.user.savedSchemes).toEqual([]);

      // Save token for subsequent tests
      testUserToken = res.body.token;
    });

    test('should fail to register a user with an already existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Another User', email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    test('should fail with missing credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('required');
    });

    test('should fail with incorrect email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'password123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Invalid email or password');
    });

    test('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Invalid email or password');
    });

    test('should successfully login and return a token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('test@example.com');
    });
  });

  describe('GET /api/auth/me', () => {
    test('should fail to access profile without token', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('Access denied');
    });

    test('should fail to access profile with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken123');

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('Invalid or expired token');
    });

    test('should return profile for authenticated user', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${testUserToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.user.name).toBe('Test User');
    });
  });
});
