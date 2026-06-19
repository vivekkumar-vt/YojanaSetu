const express = require('express');
const fs = require('fs');
const path = require('path');
const { calculateMatchScore } = require('../utils/recommendationEngine');

const router = express.Router();
const SCHEMES_FILE = path.join(__dirname, '..', 'data', 'schemes.json');

const readSchemes = () => {
  try {
    const data = fs.readFileSync(SCHEMES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

/**
 * GET /api/recommendations
 * Query params: age, gender, income, state, maritalStatus
 */
router.get('/', (req, res) => {
  try {
    const { age, gender, income, state, maritalStatus } = req.query;
    const userProfile = {
      age: parseInt(age),
      gender,
      income: parseInt(income),
      state,
      maritalStatus
    };

    const allSchemes = readSchemes();
    const recommendations = allSchemes.map(scheme => {
      const { score, explanations } = calculateMatchScore(userProfile, scheme);
      return {
        ...scheme,
        matchScore: score,
        matchExplanation: explanations.join(' ')
      };
    });

    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    const filteredRecommendations = recommendations.filter(r => r.matchScore > 0);

    res.json({
      recommendations: filteredRecommendations,
      total: filteredRecommendations.length
    });
  } catch (error) {
    console.error('Recommendation API error:', error);
    res.status(500).json({ message: 'Error generating recommendations.' });
  }
});

module.exports = router;
