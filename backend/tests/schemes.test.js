const request = require('supertest');
const fs = require('fs');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'yojana_setu_super_secret_key_2026';
}

const SCHEMES_FILE = path.join(__dirname, '..', 'data', 'schemes.json');
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

describe('Schemes Routes Integration Tests', () => {
  let app;
  let originalSchemesData = '';
  let originalUsersData = '';
  let mockToken = '';
  let mockUserId = 'user123';

  const mockSchemes = [
    {
      id: 1,
      title: "Scheme One",
      category: "Health",
      description: "Health coverage description",
      criteria: {
        ageMin: 18,
        ageMax: 60,
        genders: ["Male", "Female"],
        incomeMax: 300000,
        maritalStatus: ["Single"],
        states: "all"
      }
    },
    {
      id: 2,
      title: "PM Kisan Special",
      category: "Agriculture",
      description: "Support for farmers",
      criteria: {
        ageMin: 18,
        ageMax: 100,
        genders: ["Male"],
        incomeMax: 500000,
        maritalStatus: ["Single", "Married"],
        states: "all"
      }
    }
  ];

  const mockUsers = [
    {
      id: "user123",
      name: "Mock User",
      email: "mock@example.com",
      password: "hashedpassword",
      savedSchemes: [1]
    }
  ];

  beforeAll(() => {
    // 1. Back up data files
    if (fs.existsSync(SCHEMES_FILE)) {
      originalSchemesData = fs.readFileSync(SCHEMES_FILE, 'utf-8');
    } else {
      originalSchemesData = '[]';
    }

    if (fs.existsSync(USERS_FILE)) {
      originalUsersData = fs.readFileSync(USERS_FILE, 'utf-8');
    } else {
      originalUsersData = '[]';
    }

    // 2. Setup mock data
    fs.writeFileSync(SCHEMES_FILE, JSON.stringify(mockSchemes, null, 2));
    fs.writeFileSync(USERS_FILE, JSON.stringify(mockUsers, null, 2));

    // 3. Generate token
    mockToken = jwt.sign(
      { id: mockUserId, email: 'mock@example.com', name: 'Mock User' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Create express app
    app = express();
    app.use(express.json());
    app.use('/api/schemes', require('../routes/schemes'));
  });

  afterAll(() => {
    // Restore data files
    fs.writeFileSync(SCHEMES_FILE, originalSchemesData);
    fs.writeFileSync(USERS_FILE, originalUsersData);
  });

  describe('GET /api/schemes', () => {
    test('should fetch all schemes', async () => {
      const res = await request(app).get('/api/schemes');
      expect(res.statusCode).toBe(200);
      expect(res.body.schemes.length).toBe(2);
      expect(res.body.total).toBe(2);
    });

    test('should filter schemes by category', async () => {
      const res = await request(app).get('/api/schemes?category=Health');
      expect(res.statusCode).toBe(200);
      expect(res.body.schemes.length).toBe(1);
      expect(res.body.schemes[0].title).toBe('Scheme One');
    });

    test('should filter schemes by search query', async () => {
      const res = await request(app).get('/api/schemes?search=kisan');
      expect(res.statusCode).toBe(200);
      expect(res.body.schemes.length).toBe(1);
      expect(res.body.schemes[0].title).toBe('PM Kisan Special');
    });
  });

  describe('GET /api/schemes/:id', () => {
    test('should fetch a single scheme successfully', async () => {
      const res = await request(app).get('/api/schemes/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.scheme.title).toBe('Scheme One');
    });

    test('should fail if scheme ID does not exist', async () => {
      const res = await request(app).get('/api/schemes/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toContain('Scheme not found');
    });
  });

  describe('GET /api/schemes/saved', () => {
    test('should fail if unauthorized', async () => {
      const res = await request(app).get('/api/schemes/saved');
      expect(res.statusCode).toBe(401);
    });

    test('should return saved schemes for logged-in user', async () => {
      const res = await request(app)
        .get('/api/schemes/saved')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.schemes.length).toBe(1);
      expect(res.body.schemes[0].id).toBe(1);
    });
  });

  describe('POST /api/schemes/:id/save', () => {
    test('should fail if unauthorized', async () => {
      const res = await request(app).post('/api/schemes/1/save');
      expect(res.statusCode).toBe(401);
    });

    test('should unsave an already saved scheme', async () => {
      const res = await request(app)
        .post('/api/schemes/1/save')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.saved).toBe(false);
      expect(res.body.savedSchemes).not.toContain(1);

      // Verify persistence in test users database
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      expect(users[0].savedSchemes).not.toContain(1);
    });

    test('should save a scheme', async () => {
      const res = await request(app)
        .post('/api/schemes/2/save')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.saved).toBe(true);
      expect(res.body.savedSchemes).toContain(2);

      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      expect(users[0].savedSchemes).toContain(2);
    });
  });
});
