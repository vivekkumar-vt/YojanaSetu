const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/auth');
const schemeRoutes = require('./routes/schemes');
const recommendationRoutes = require('./routes/recommendations');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Yojana Setu API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Yojana Setu Backend running on http://localhost:${PORT}`);
});
