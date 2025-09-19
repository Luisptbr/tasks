// Serviço para operações relacionadas a usuários

import { apiRequest, API_CONFIG } from '@/config/api';
import { User, UserDTO, UserLoginDTO } from '@/types';

export const userService = {
  // Criar novo usuário (registro)
  async createUser(userData: UserDTO): Promise<User> {
    return apiRequest<User>(API_CONFIG.ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Listar todos os usuários
  async getAllUsers(): Promise<User[]> {
    return apiRequest<User[]>(API_CONFIG.ENDPOINTS.USERS, {
      method: 'GET',
    });
  },

  // Buscar usuário por ID
  async getUserById(id: number): Promise<User> {
    return apiRequest<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, {
      method: 'GET',
    });
  },

  // Atualizar usuário
  async updateUser(id: number, userData: UserDTO): Promise<User> {
    return apiRequest<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Deletar usuário
  async deleteUser(id: number): Promise<void> {
    return apiRequest<void>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, {
      method: 'DELETE',
    });
  },

  // Login do usuário (simulado - você pode implementar autenticação real depois)
  async loginUser(loginData: UserLoginDTO): Promise<User | null> {
    try {
      // Busca todos os usuários e verifica se existe um com o email fornecido
      const users = await this.getAllUsers();
      const user = users.find(u => u.email === loginData.email);
      
      if (user) {
        // Em uma aplicação real, a senha seria verificada no backend
        // Por agora, retornamos o usuário encontrado
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Erro ao realizar login');
    }
  },

  // Verificar se email já existe (útil para validação de registro)
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      return users.some(user => user.email === email);
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  }
};
