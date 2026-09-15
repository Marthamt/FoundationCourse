import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PaymentRecord } from '../types';

interface CheckoutData {
  name: string;
  email: string;
  cardNumber?: string;
  expMonth?: string;
  expYear?: string;
  cvc?: string;
  paymentMethod?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  hasPaidAccess: boolean;
  isAdmin: boolean;
  login: (email: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkout: (data: CheckoutData) => Promise<{ success: boolean; receipt?: PaymentRecord; error?: string }>;
  demoLogin: (role: 'admin' | 'student' | 'unpaid') => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('fc_auth_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('fc_auth_token', token);
    } else {
      localStorage.removeItem('fc_auth_token');
    }
  }, [token]);

  // Load user on start or token change
  const refreshUser = async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // Token invalid or expired
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to load user', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [token]);

  const login = async (email: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error during login' };
    }
  };

  const register = async (name: string, email: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error during registration' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('fc_auth_token');
  };

  const checkout = async (data: CheckoutData) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || 'Payment processing failed' };
      }

      if (resData.token) {
        setToken(resData.token);
      }
      if (resData.user) {
        setUser(resData.user);
      }

      return { success: true, receipt: resData.paymentRecord };
    } catch (err) {
      return { success: false, error: 'Connection error while verifying payment' };
    }
  };

  const demoLogin = async (role: 'admin' | 'student' | 'unpaid') => {
    let email = 'student@example.com';
    if (role === 'admin') email = 'admin@foundationcourse.com';
    if (role === 'unpaid') email = 'alex@example.com';

    await login(email);
  };

  const hasPaidAccess = !!(user && (user.hasPaidAccess || user.role === 'admin'));
  const isAdmin = !!(user && user.role === 'admin');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        hasPaidAccess,
        isAdmin,
        login,
        register,
        logout,
        checkout,
        demoLogin,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
