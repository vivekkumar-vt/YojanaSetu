const { calculateMatchScore } = require('../utils/recommendationEngine');

describe('Recommendation Engine Unit Tests', () => {
  const mockScheme = {
    id: 99,
    title: "Test Scheme",
    criteria: {
      ageMin: 18,
      ageMax: 60,
      genders: ["Male", "Female"],
      incomeMax: 500000,
      maritalStatus: ["Single", "Married"],
      states: ["Karnataka", "Maharashtra"]
    }
  };

  test('should return score 0 if scheme criteria is undefined', () => {
    const result = calculateMatchScore({ age: 25 }, { title: "No Criteria" });
    expect(result.score).toBe(0);
    expect(result.explanations).toContain("No criteria defined for this scheme.");
  });

  test('should compute a perfect match (score 100) when all criteria match', () => {
    const user = {
      age: 25,
      gender: "Male",
      income: 300000,
      maritalStatus: "Single",
      state: "Karnataka"
    };

    const result = calculateMatchScore(user, mockScheme);
    expect(result.score).toBe(100);
    expect(result.explanations.length).toBe(5);
    expect(result.explanations[0]).toContain("Your age (25) falls within the required range");
    expect(result.explanations[1]).toContain("Your gender (Male) matches the scheme requirements");
    expect(result.explanations[2]).toContain("Your annual income (₹3,00,000) is below the maximum limit");
    expect(result.explanations[3]).toContain("Your marital status (Single) matches");
    expect(result.explanations[4]).toContain("Available in your state");
  });

  test('should penalize age if out of range', () => {
    const user = {
      age: 15,
      gender: "Male",
      income: 300000,
      maritalStatus: "Single",
      state: "Karnataka"
    };

    const result = calculateMatchScore(user, mockScheme);
    expect(result.score).toBe(80);
    expect(result.explanations.some(e => e.includes("age"))).toBe(false);
  });

  test('should penalize gender if out of range', () => {
    const user = {
      age: 25,
      gender: "Other",
      income: 300000,
      maritalStatus: "Single",
      state: "Karnataka"
    };

    const result = calculateMatchScore(user, mockScheme);
    expect(result.score).toBe(80);
    expect(result.explanations.some(e => e.includes("gender"))).toBe(false);
  });

  test('should penalize income if it exceeds maximum limit', () => {
    const user = {
      age: 25,
      gender: "Male",
      income: 600000,
      maritalStatus: "Single",
      state: "Karnataka"
    };

    const result = calculateMatchScore(user, mockScheme);
    expect(result.score).toBe(60);
    expect(result.explanations.some(e => e.includes("income"))).toBe(false);
  });

  test('should penalize marital status if unmatched', () => {
    const user = {
      age: 25,
      gender: "Male",
      income: 300000,
      maritalStatus: "Widowed",
      state: "Karnataka"
    };

    const result = calculateMatchScore(user, mockScheme);
    expect(result.score).toBe(90);
    expect(result.explanations.some(e => e.includes("marital"))).toBe(false);
  });

  test('should handle state criteria of "all"', () => {
    const allStateScheme = {
      ...mockScheme,
      criteria: {
        ...mockScheme.criteria,
        states: "all"
      }
    };
    const user = {
      age: 25,
      gender: "Male",
      income: 300000,
      maritalStatus: "Single",
      state: "Bihar"
    };

    const result = calculateMatchScore(user, allStateScheme);
    expect(result.score).toBe(100);
    expect(result.explanations[4]).toContain("Available in your state (Bihar)");
  });

  test('should handle missing fields gracefully', () => {
    const user = {};
    const result = calculateMatchScore(user, mockScheme);
    expect(result.score).toBe(5);
  });
});
