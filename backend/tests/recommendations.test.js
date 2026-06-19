const request = require('supertest');
const fs = require('fs');
const path = require('path');
const express = require('express');

const SCHEMES_FILE = path.join(__dirname, '..', 'data', 'schemes.json');

describe('Recommendations Routes Integration Tests', () => {
  let app;
  let originalSchemesData = '';

  const mockSchemes = [
    {
      id: 1,
      title: "Ayushman Bharat",
      category: "Health",
      description: "Medical insurance support",
      criteria: {
        ageMin: 0,
        ageMax: 120,
        genders: ["Male", "Female", "Other"],
        incomeMax: 300000,
        maritalStatus: ["Single", "Married", "Widowed"],
        states: "all"
      }
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
    app.use('/api/recommendations', require('../routes/recommendations'));
  });

  afterAll(() => {
    fs.writeFileSync(SCHEMES_FILE, originalSchemesData);
  });

  test('should generate scheme recommendations with match scores and explanations', async () => {
    const res = await request(app)
      .get('/api/recommendations')
      .query({
        age: 30,
        gender: 'Male',
        income: 150000,
        state: 'Delhi',
        maritalStatus: 'Married'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.recommendations.length).toBe(1);
    expect(res.body.total).toBe(1);
    
    const recommendation = res.body.recommendations[0];
    expect(recommendation.id).toBe(1);
    expect(recommendation.matchScore).toBe(100);
    expect(recommendation.matchExplanation).toContain('Your age (30) falls within the required range');
    expect(recommendation.matchExplanation).toContain('Your gender (Male) matches');
    expect(recommendation.matchExplanation).toContain('annual income');
  });

  test('should return empty recommendations if no schemes match criteria', async () => {
    const res = await request(app)
      .get('/api/recommendations')
      .query({
        age: 30,
        gender: 'Male',
        income: 500000,
        state: 'Delhi',
        maritalStatus: 'Married'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.recommendations.length).toBe(1);
    expect(res.body.recommendations[0].matchScore).toBe(60);
    expect(res.body.recommendations[0].matchExplanation).not.toContain('Your annual income');
  });
});
