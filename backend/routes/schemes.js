const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();
const SCHEMES_FILE = path.join(__dirname, '..', 'data', 'schemes.json');
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

const readSchemes = () => {
  try {
    const data = fs.readFileSync(SCHEMES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// GET /api/schemes — Get all schemes (with optional filters)
router.get('/', (req, res) => {
  try {
    let schemes = readSchemes();
    const { category, search } = req.query;

    if (category && category !== 'All') {
      schemes = schemes.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const term = search.toLowerCase();
      schemes = schemes.filter(s =>
        s.title.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.category.toLowerCase().includes(term)
      );
    }

    res.json({ schemes, total: schemes.length });
  } catch (error) {
    console.error('Get schemes error:', error);
    res.status(500).json({ message: 'Server error fetching schemes.' });
  }
});

// GET /api/schemes/saved — Get user's saved schemes (protected)
router.get('/saved', auth, (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const allSchemes = readSchemes();
    const savedSchemes = allSchemes.filter(s => user.savedSchemes.includes(s.id));

    res.json({ schemes: savedSchemes });
  } catch (error) {
    console.error('Get saved schemes error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/schemes/:id — Get single scheme
router.get('/:id', (req, res) => {
  try {
    const schemes = readSchemes();
    const scheme = schemes.find(s => s.id === parseInt(req.params.id));

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found.' });
    }

    res.json({ scheme });
  } catch (error) {
    console.error('Get scheme error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/schemes/:id/save — Toggle save/unsave a scheme (protected)
router.post('/:id/save', auth, (req, res) => {
  try {
    const schemeId = parseInt(req.params.id);
    const schemes = readSchemes();
    const scheme = schemes.find(s => s.id === schemeId);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found.' });
    }

    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = users[userIndex];
    const alreadySaved = user.savedSchemes.includes(schemeId);

    if (alreadySaved) {
      user.savedSchemes = user.savedSchemes.filter(id => id !== schemeId);
    } else {
      user.savedSchemes.push(schemeId);
    }

    users[userIndex] = user;
    writeUsers(users);

    res.json({
      saved: !alreadySaved,
      savedSchemes: user.savedSchemes,
      message: alreadySaved ? 'Scheme removed from saved list.' : 'Scheme saved successfully!',
    });
  } catch (error) {
    console.error('Save scheme error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
