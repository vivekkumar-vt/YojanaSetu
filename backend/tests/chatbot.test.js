const request = require('supertest');
const fs = require('fs');
const path = require('path');
const express = require('express');

const SCHEMES_FILE = path.join(__dirname, '..', 'data', 'schemes.json');

describe('Chatbot Routes Integration Tests', () => {
  let app;
  let originalSchemesData = '';

  const mockSchemes = [
    {
      id: 1,
      title: "Scheme Health",
      category: "Health",
      description: "Medical support"
    },
    {
      id: 2,
      title: "Kisan Support",
      category: "Agriculture",
      description: "Farmer support"
    },
    {
      id: 3,
      title: "Student Allowance",
      category: "Education",
      description: "Scholarship support"
    }
  ];

  beforeAll(() => {
    if (fs.existsSync(SCHEMES_FILE)) {
      originalSchemesData = fs.readFileSync(SCHEMES_FILE, 'utf-8');
    } else {
      originalSchemesData = '[]';
    }

    fs.writeFileSync(SCHEMES_FILE, JSON.stringify(mockSchemes, null, 2));

    app = express();
    app.use(express.json());
    app.use('/api/chatbot', require('../routes/chatbot'));
  });

  afterAll(() => {
    fs.writeFileSync(SCHEMES_FILE, originalSchemesData);
  });

  test('should fail if message body is missing', async () => {
    const res = await request(app)
      .post('/api/chatbot')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('required');
  });

  test('should respond to greetings', async () => {
    const res = await request(app)
      .post('/api/chatbot')
      .send({ message: 'Hello Yojana Setu!' });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toContain('Namaste!');
    expect(res.body.schemes).toEqual([]);
  });

  test('should respond to thank you messages', async () => {
    const res = await request(app)
      .post('/api/chatbot')
      .send({ message: 'Thank you very much' });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toContain('welcome');
    expect(res.body.schemes).toEqual([]);
  });

  test('should match health keywords and return health schemes', async () => {
    const res = await request(app)
      .post('/api/chatbot')
      .send({ message: 'I need some help with my medical treatment' });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toContain('health schemes');
    expect(res.body.schemes.length).toBe(1);
    expect(res.body.schemes[0].title).toBe('Scheme Health');
  });

  test('should match student/scholarship keywords and return education schemes', async () => {
    const res = await request(app)
      .post('/api/chatbot')
      .send({ message: 'gimme some scholarship details' });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toContain('student schemes');
    expect(res.body.schemes.length).toBe(1);
    expect(res.body.schemes[0].title).toBe('Student Allowance');
  });

  test('should fallback gracefully to unmatched inquiries', async () => {
    const res = await request(app)
      .post('/api/chatbot')
      .send({ message: 'tell me about spaceships' });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toContain("I'm not exactly sure about that");
    expect(res.body.schemes).toEqual([]);
  });
});
