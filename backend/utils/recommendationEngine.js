/**
 * Recommendation Engine for Yojana Setu
 * Calculates match score and generates explanations based on user profile and scheme criteria.
 */

const calculateMatchScore = (user, scheme) => {
  let score = 0;
  const explanations = [];
  const criteria = scheme.criteria;

  if (!criteria) return { score: 0, explanations: ["No criteria defined for this scheme."] };

  // 1. Age Check (Weight: 20)
  const age = parseInt(user.age);
  if (!isNaN(age)) {
    if (age >= criteria.ageMin && age <= criteria.ageMax) {
      score += 20;
      explanations.push(`Your age (${age}) falls within the required range of ${criteria.ageMin}-${criteria.ageMax} years.`);
    } else {
      explanations.push(`This scheme requires age between ${criteria.ageMin} and ${criteria.ageMax}.`);
    }
  }

  // 2. Gender Check (Weight: 20)
  if (user.gender) {
    if (criteria.genders.includes(user.gender)) {
      score += 20;
      explanations.push(`Your gender (${user.gender}) matches the scheme requirements.`);
    } else {
      explanations.push(`This scheme is specifically for ${criteria.genders.join(', ')}.`);
    }
  }

  // 3. Income Check (Weight: 40)
  const income = parseInt(user.income);
  if (!isNaN(income)) {
    if (income <= criteria.incomeMax) {
      score += 40;
      explanations.push(`Your annual income (₹${income.toLocaleString('en-IN')}) is below the maximum limit of ₹${criteria.incomeMax.toLocaleString('en-IN')}.`);
    } else {
      explanations.push(`The maximum income limit for this scheme is ₹${criteria.incomeMax.toLocaleString('en-IN')}.`);
    }
  } else {
    // If income not provided, we can't fully qualify but might still show it
    explanations.push("Income verification is required for full eligibility check.");
  }

  // 4. Marital Status Check (Weight: 10)
  if (user.maritalStatus) {
    if (criteria.maritalStatus.includes(user.maritalStatus)) {
      score += 10;
      explanations.push(`Your marital status (${user.maritalStatus}) matches the scheme requirements.`);
    } else {
      explanations.push(`This scheme is for individuals who are ${criteria.maritalStatus.join(' or ')}.`);
    }
  }

  // 5. State Check (Weight: 10)
  if (user.state) {
    if (criteria.states === 'all' || (Array.isArray(criteria.states) && criteria.states.includes(user.state)) || criteria.states === user.state) {
      score += 10;
      explanations.push(`Available in your state (${user.state}).`);
    } else {
      explanations.push(`This scheme might not be available in ${user.state}.`);
    }
  } else {
    score += 5; // Default some points if state is all
    explanations.push("State-specific eligibility may apply.");
  }

  return {
    score: Math.min(score, 100),
    explanations: explanations.filter(e => e.includes('Your') || e.includes('your') || e.includes('falls') || e.includes('matches') || e.includes('Available'))
  };
};

module.exports = { calculateMatchScore };
