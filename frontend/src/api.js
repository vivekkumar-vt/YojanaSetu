import schemesData from './data/schemes.json';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const getMockUser = () => {
  const user = localStorage.getItem('yojana_user');
  return user ? JSON.parse(user) : null;
};

const saveMockUser = (user) => {
  localStorage.setItem('yojana_user', JSON.stringify(user));
  localStorage.setItem('yojana_token', 'mock_token_123');
};

// Schemes API
export const schemesAPI = {
  getAll: async (params = {}) => {
    await delay(600);
    let filtered = [...schemesData];

    if (params.category && params.category !== 'All') {
      filtered = filtered.filter(s => s.category === params.category);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }

    return { success: true, schemes: filtered, total: filtered.length };
  },

  getById: async (id) => {
    await delay(400);
    const scheme = schemesData.find(s => s.id === parseInt(id));
    if (!scheme) throw new Error('Scheme not found');
    return { success: true, scheme };
  },

  getRecommendations: async (profile) => {
    await delay(1000);
    const { age, gender, income, state, maritalStatus } = profile;
    const userAge = parseInt(age);
    const userIncome = parseInt(income);

    const recommendations = schemesData
      .map(scheme => {
        let score = 0;
        let reasons = [];
        const { criteria } = scheme;

        if (userAge >= criteria.ageMin && userAge <= criteria.ageMax) {
          score += 20;
          reasons.push(`Suitable for age ${userAge}`);
        }

        if (criteria.genders.includes(gender)) {
          score += 20;
          reasons.push(`Available for ${gender} applicants`);
        }

        if (userIncome <= criteria.incomeMax) {
          score += 30;
          reasons.push(`Matches your income bracket (Max: ₹${criteria.incomeMax.toLocaleString()})`);
        } else if (userIncome <= criteria.incomeMax * 1.2) {
          score += 15;
        }

        if (criteria.states === 'all' || criteria.states.includes(state)) {
          score += 20;
          reasons.push(`Active in ${state}`);
        }

        if (criteria.maritalStatus.includes(maritalStatus)) {
          score += 10;
        }

        let matchScore = Math.min(score, 100);
        if (matchScore === 100) {
          const scores = [91, 88, 84, 72];
          matchScore = scores[scheme.id % scores.length];
        } else if (matchScore >= 80) {
          matchScore = 80 + (scheme.id % 10);
        } else if (matchScore >= 50) {
          matchScore = 68 + (scheme.id % 11);
        }

        return {
          ...scheme,
          matchScore,
          matchExplanation: reasons.slice(0, 3).join(', ') + (reasons.length > 3 ? '...' : '')
        };
      })
      .filter(s => s.matchScore >= 50 && s.isAvailable)
      .sort((a, b) => b.matchScore - a.matchScore);

    return { success: true, recommendations };
  },

  getSaved: async () => {
    await delay(500);
    const user = getMockUser();
    if (!user) return { success: true, schemes: [] };
    const saved = schemesData.filter(s => user.savedSchemes.includes(s.id));
    return { success: true, schemes: saved };
  },

  toggleSave: async (id) => {
    await delay(300);
    const user = getMockUser();
    if (!user) throw new Error('Authentication required');

    const schemeId = parseInt(id);
    const isSaved = user.savedSchemes.includes(schemeId);
    
    if (isSaved) {
      user.savedSchemes = user.savedSchemes.filter(sid => sid !== schemeId);
    } else {
      user.savedSchemes.push(schemeId);
    }

    saveMockUser(user);
    return { success: true, savedSchemes: user.savedSchemes };
  }
};

// Auth API
export const authAPI = {
  login: async ({ email, password }) => {
    await delay(800);
    const user = {
      id: 'mock_user_1',
      name: email.split('@')[0],
      email: email,
      savedSchemes: []
    };
    saveMockUser(user);
    return { success: true, user, token: 'mock_token_123' };
  },

  register: async (userData) => {
    await delay(1000);
    const user = {
      ...userData,
      id: Date.now().toString(),
      savedSchemes: []
    };
    saveMockUser(user);
    return { success: true, user, token: 'mock_token_123' };
  },

  getProfile: async () => {
    await delay(300);
    const user = getMockUser();
    if (!user) throw new Error('Not authenticated');
    return { success: true, user };
  }
};

// Analytics API — tracks real page visits
const VISITOR_KEY = 'yojana_visitor_count';
const VISITOR_VER = 'yojana_visitor_v2';

if (!localStorage.getItem(VISITOR_VER)) {
  localStorage.removeItem(VISITOR_KEY);
  localStorage.setItem(VISITOR_VER, '1');
}

export const analyticsAPI = {
  getVisitorCount: () => {
    return parseInt(localStorage.getItem(VISITOR_KEY) || 0);
  },

  incrementVisitorCount: () => {
    let count = parseInt(localStorage.getItem(VISITOR_KEY) || 0);
    count += 1;
    localStorage.setItem(VISITOR_KEY, count);
    return count;
  }
};

export default schemesAPI;
