import schemesData from './data/schemes.json';

// Helper to simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user store in memory/localStorage (only for this frontend demo)
const getMockUser = () => {
  const user = localStorage.getItem('yojana_user');
  return user ? JSON.parse(user) : null;
};

const saveMockUser = (user) => {
  localStorage.setItem('yojana_user', JSON.stringify(user));
  localStorage.setItem('yojana_token', 'mock_token_123'); // Fake token
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

        // 1. Age check
        if (userAge >= criteria.ageMin && userAge <= criteria.ageMax) {
          score += 20;
          reasons.push(`Suitable for age ${userAge}`);
        }

        // 2. Gender check
        if (criteria.genders.includes(gender)) {
          score += 20;
          reasons.push(`Available for ${gender} applicants`);
        }

        // 3. Income check
        if (userIncome <= criteria.incomeMax) {
          score += 30;
          reasons.push(`Matches your income bracket (Max: ₹${criteria.incomeMax.toLocaleString()})`);
        } else if (userIncome <= criteria.incomeMax * 1.2) {
          score += 15; // Partial match if just above limit
        }

        // 4. State check
        if (criteria.states === 'all' || criteria.states.includes(state)) {
          score += 20;
          reasons.push(`Active in ${state}`);
        }

        // 5. Marital check
        if (criteria.maritalStatus.includes(maritalStatus)) {
          score += 10;
        }

        // Final score calculation (0-100)
        const matchScore = Math.min(score, 100);

        return {
          ...scheme,
          matchScore,
          matchExplanation: reasons.slice(0, 3).join(', ') + (reasons.length > 3 ? '...' : '')
        };
      })
      .filter(s => s.matchScore >= 50 && s.isAvailable) // Only show good matches
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
    // Simple mock: any email/password works
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

// Clear stale data from old logic (e.g. the old 1,200,450 fake seed)
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
