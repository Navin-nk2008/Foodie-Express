import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sendOtp: (phone: string) => Promise<{ success: boolean; demoOtp?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  sendOtp: async () => ({ success: false }),
  verifyOtp: async () => false,
  logout: () => {},
  updateProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial demo session check: load primary profile from backend
  useEffect(() => {
    async function loadSession() {
      try {
        const data = await userApi.getProfile();
        if (data && data.user) {
          setUser(data.user);
          setToken('demo_session_token');
        }
      } catch (e) {
        console.log('[AuthContext] No active session found or backend offline');
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, []);

  const sendOtp = async (phone: string) => {
    const res = await authApi.sendOtp(phone);
    return { success: res.success, demoOtp: res.demoOtp };
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      const res = await authApi.verifyOtp(phone, otp);
      if (res.success && res.user) {
        setUser(res.user);
        setToken(res.token);
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {}
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    const res = await userApi.updateProfile(data);
    if (res.user) {
      setUser(res.user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        sendOtp,
        verifyOtp,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
