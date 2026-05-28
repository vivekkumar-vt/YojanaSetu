const express = require('express');
const fs = require('fs');
const path = require('path');

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
 * POST /api/chatbot
 * Body: { message: string }
 */
router.post('/', (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required.' });

    const schemes = readSchemes();
    const query = message.toLowerCase();

    // Basic keyword mapping
    const keywords = {
      'student': ['education', 'scholarship', 'university', 'college', 'school'],
      'farmer': ['agriculture', 'kisan', 'farm', 'crop', 'land'],
      'health': ['medical', 'hospital', 'disease', 'insurance', 'treatment'],
      'women': ['female', 'girl', 'daughter', 'mother', 'widow'],
      'business': ['entrepreneur', 'startup', 'loan', 'industry', 'loan'],
      'house': ['housing', 'home', 'awas', 'construction'],
      'job': ['employment', 'work', 'mgnrega', 'skill']
    };

    let matchedCategory = null;
    
    // Greeting check
    if (query.match(/^(hi|hello|hey|namaste|greetings)/)) {
      return res.json({
        reply: "Namaste! I'm your Yojana Setu Assistant. How can I help you find the right government schemes today? You can ask me about scholarships, farming, health, or business loans.",
        schemes: []
      });
    }

    // Thanks check
    if (query.match(/^(thanks|thank you|thx|shukriya)/)) {
      return res.json({
        reply: "You're very welcome! Is there anything else you'd like to know about our schemes?",
        schemes: []
      });
    }

    for (const [category, synonyms] of Object.entries(keywords)) {
      if (query.includes(category) || synonyms.some(s => query.includes(s))) {
        matchedCategory = category;
        break;
      }
    }

    let results = [];
    let botResponse = "";

    if (matchedCategory) {
      results = schemes.filter(s => 
        s.category.toLowerCase().includes(matchedCategory) || 
        s.title.toLowerCase().includes(matchedCategory) ||
        s.description.toLowerCase().includes(matchedCategory)
      );
      
      if (results.length > 0) {
        botResponse = `I found some ${matchedCategory} schemes that might interest you. Here are the top matches:`;
      } else {
        botResponse = `I understand you're looking for information on ${matchedCategory}, but I couldn't find any specific matching schemes right now. You can browse all schemes on our homepage!`;
      }
    } else {
      botResponse = "I'm not exactly sure about that. Could you try asking about 'scholarships for students' or 'schemes for farmers'? You can also browse our 'All Schemes' section.";
    }

    res.json({
      reply: botResponse,
      schemes: results.slice(0, 3) // Return top 3 matches
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    res.status(500).json({ message: 'Chatbot is currently busy. Try again later!' });
  }
});

module.exports = router;
