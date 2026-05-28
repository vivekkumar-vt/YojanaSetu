import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('yojana_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authAPI.getProfile();
        setUser(data.user);
      } catch (err) {
        console.error('Auto-login failed:', err);
        localStorage.removeItem('yojana_token');
        localStorage.removeItem('yojana_user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await authAPI.login({ email, password });
      localStorage.setItem('yojana_token', data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const data = await authAPI.register(userData);
      localStorage.setItem('yojana_token', data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('yojana_token');
    localStorage.removeItem('yojana_user');
    setUser(null);
  };

  const updateSavedSchemes = (savedSchemes) => {
    setUser(prev => prev ? { ...prev, savedSchemes } : null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateSavedSchemes,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
