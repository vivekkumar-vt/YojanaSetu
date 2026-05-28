import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SchemeDetail from './pages/SchemeDetail';
import Dashboard from './pages/Dashboard';
import FindSchemes from './pages/FindSchemes';
import SchemeResults from './pages/SchemeResults';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AccessibilityPage from './pages/AccessibilityPage';
import { analyticsAPI } from './api';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="accessibility" element={<AccessibilityPage />} />
        <Route path="find-schemes" element={<ProtectedRoute><FindSchemes /></ProtectedRoute>} />
        <Route path="results" element={<ProtectedRoute><SchemeResults /></ProtectedRoute>} />
        <Route path="scheme/:id" element={<ProtectedRoute><SchemeDetail /></ProtectedRoute>} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
