import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutApi, verifyTokenApi } from '@/api/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (token && storedUserId) {
      // Verify token with backend
      verifyTokenApi(token).then(data => {
        if (data.valid) {
          setUserId(storedUserId);
          setIsLoggedIn(true);
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        }
      }).catch(() => {
        // Fallback to local check if API fails
        setUserId(storedUserId);
        setIsLoggedIn(true);
      });
    }
  }, []);

  const login = (userId: string, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setUserId(userId);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      // Continue with logout even if API fails
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId(null);
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to require login (redirect if not logged in)
export function useRequireLogin() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
}

// Hook to redirect if already logged in
export function useRedirectIfLoggedIn() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
}
