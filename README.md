# 🇮🇳 Yojana Setu (योजना सेतु)

> **Empowering Citizens, Bridging Governance**  
> *A state-of-the-art full-stack digital portal designed to bridge the gap between Indian citizens and government welfare schemes through intelligent profile matching, semantic search, and an AI-powered chatbot assistant.*

---

## 🌟 Core Pillars & Key Features

Yojana Setu is a comprehensive citizens' discovery portal designed with a premium, modern, and highly interactive visual identity. It is built as a recruiter-ready portfolio piece demonstrating high-fidelity frontend aesthetics, clean state management, modular components, and solid full-stack design.

### 🔍 1. Smart Profile Matching Engine
- Dynamically parses citizen demographics (Age, Gender, Household Income, State/UT, and Marital Status).
- Calculates eligibility in real-time, assigning a matching percentage and providing a clear, step-by-step logic breakdown (e.g. *"Matches your income bracket (Max: ₹1,50,000)"*).
- Filters out non-eligible schemes dynamically to prevent information overload.

### 📋 2. Interactive Discovery Dashboard
- Discover central and state government schemes across diverse welfare domains (Health, Agriculture, Education, Business & Startups, Housing, Women & Child welfare, and Employment).
- Instantly search hundreds of active schemes using an optimized client-side debounce utility.

### 🤖 3. Intelligent Offline Chatbot Assistant
- A custom, context-aware rule-based Natural Language Processing chatbot.
- Understands user inquiries (e.g., *"I'm a student looking for a scholarship"*, *"help for farmers"*, *"medical treatment support"*) and responds with a friendly greeting, recommendations, and direct navigation links to top matching schemes.

### 🎯 4. Premium Brand Identity & Modern UX
- **Indian Flag Emblem**: Custom-designed, premium 3-band national flag brand logo in the navigation bar with spring-based micro-animations on hover.
- **Visual Design System**: Vibrant yet balanced colors utilizing a lightened coral-orange and saffron palette, glassmorphism card designs, dynamic background mesh gradients, and smooth interactive layout transitions powered by **Framer Motion**.
- **Document Checklist & Tools**: Interactive interactive checklist helping citizens verify their documents (Aadhaar, income certificates, etc.) before applying, with bookmarks persistent in localStorage.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework**: React 18 (Vite-powered for high-performance Hot Module Replacement)
- **Styling**: Tailwind CSS v4 (Custom theme configurations and lightened color system)
- **Animations**: Framer Motion (Spring physics, layout transitions, keyframe shifts)
- **Iconography**: Lucide React

### Backend Service (Optional API)
- **Environment**: Node.js & Express
- **Security**: JSON Web Token (JWT) signing & validation, bcryptjs for secure password hashing
- **Middleware**: CORS, JSON parser, dotenv configurations

---

## 📁 Repository Structure

```tree
Yojana Setu/
│
├── backend/                  # Node.js & Express REST API
│   ├── data/                 # Local mock databases (users.json, schemes.json)
│   ├── middleware/           # JWT Authentication middleware
│   ├── routes/               # Modular Express router endpoints
│   ├── tests/                # Jest integration tests
│   ├── utils/                # Password hashing and helper scripts
│   ├── .env.example          # Template for backend server variables
│   └── index.js              # Server entry point
│
├── frontend/                 # React client application
│   ├── public/               # Favicons, vector SVGs, assets
│   ├── src/                  # Component source folder
│   │   ├── assets/           # Client-side static media
│   │   ├── components/       # Reusable components (Navbar, Chatbot, Layout, etc.)
│   │   ├── context/          # Context API (Auth state, JWT parsing)
│   │   ├── data/             # Frontend local mock database
│   │   ├── pages/            # Page layouts (Home, Landing, FindSchemes, etc.)
│   │   ├── api.js            # Mock client-side service layer & logic
│   │   ├── index.css         # Master stylesheet & custom button gradients
│   │   ├── siteConfig.js     # Site metadata & centralized global labels
│   │   └── main.jsx          # React app mounting point
│   ├── tailwind.config.js    # Tailwind configuration
│   └── vite.config.js        # Vite bundler options
│
└── .gitignore                # Master multi-layer Git exclusions file
```

---

## 🚀 Installation & Running Locally

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/yojana-setu.git
cd yojana-setu
```

### Step 2: Running the Standalone Frontend
By default, the frontend is equipped with a mock API client that stores data in local storage, meaning you can run and view the entire interactive portal as a client-only static app!
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to experience the portal.

### Step 3: Running the Full-Stack Backend (Optional)
If you wish to explore the Express REST API endpoints, user registration storage, and Jest tests:
1. Navigate to the backend directory:
   ```bash
   cd ../backend
   npm install
   ```
2. Set up your local environment variables:
   ```bash
   copy .env.example .env
   ```
3. Open the newly created `.env` file and customize your local credentials:
   ```env
   PORT=5000
   JWT_SECRET=your_local_secret_signing_key
   ```
4. Spin up the development server:
   ```bash
   npm run dev
   ```
   The backend will start running on [http://localhost:5000](http://localhost:5000).

---

## 🛡️ Security & Clean Code Audits (Safe for GitHub)
This codebase has been strictly audited and configured for a **100% safe public GitHub release**:
- **Zero Secrets Leakage**: Comprehensive root `.gitignore` blocks `.env` files, build caches, and node modules across both directories from being tracked. A clean `.env.example` template is provided instead.
- **No Personal Data Exposure**: The codebase is completely scrubbed of personal support emails, phone numbers, database connections, and actual credentials.
- **Recruiter Ready**: Unused template boilerplate codes have been cleaned, and folders are neatly structured for professional presentation.

---

## 🔮 Future Roadmap & Enhancements
- **Aadhaar Core Authentication**: Integrate with official sandbox APIs to verify citizen identities securely.
- **Direct Enrollment Portals**: Allow eligible users to directly fill out simplified application forms inside Yojana Setu and track their approval progress.
- **Real-Time Push Alerts**: Set up SMS, Email, or WhatsApp subscriptions when new state or central schemes matching a user's profile are launched.
- **Localized Languages**: Support multi-lingual interfaces in Hindi, Marathi, Tamil, Bengali, and other major regional languages.

---

## 📄 License
This project is for demo and portfolio purposes. It is licensed under the MIT License. It is not affiliated with, nor does it represent, any official government entity.
