'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserLoginDTO, UserDTO } from '@/types';
import { userService } from '@/services/userService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loginData: UserLoginDTO) => Promise<boolean>;
  register: (userData: UserDTO) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há um usuário logado no localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        // Garantir que o cookie também esteja definido
        document.cookie = `user=${savedUser}; path=/; max-age=86400; SameSite=Lax`;
      } catch (error) {
        console.error('Erro ao recuperar usuário do localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Função de login
  const login = async (loginData: UserLoginDTO): Promise<boolean> => {
    try {
      setIsLoading(true);
      const loggedUser = await userService.loginUser(loginData);
      
      if (loggedUser) {
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        // Definir cookie para o middleware
        document.cookie = `user=${JSON.stringify(loggedUser)}; path=/; max-age=86400; SameSite=Lax`;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro
  const register = async (userData: UserDTO): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Verifica se o email já existe
      const emailExists = await userService.checkEmailExists(userData.email);
      if (emailExists) {
        throw new Error('Email já cadastrado');
      }

      // Cria o usuário
      const newUser = await userService.createUser(userData);
      
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        // Definir cookie para o middleware
        document.cookie = `user=${JSON.stringify(newUser)}; path=/; max-age=86400; SameSite=Lax`;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Remover cookie
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
