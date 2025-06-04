
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { storage } from '@/utils/storage';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { email: string; password: string; name: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = storage.get<User>('user');
    if (savedUser) {
      setState({
        user: savedUser,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - replace with real authentication later
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };

      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });

      storage.set('user', mockUser);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: { email: string; password: string; name: string }): Promise<boolean> => {
    try {
      // Simulate API call - replace with real authentication later
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
      };

      setState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });

      storage.set('user', newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    storage.remove('user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      setState(prev => ({ ...prev, user: updatedUser }));
      storage.set('user', updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
