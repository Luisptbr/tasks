// Serviço para operações relacionadas a tarefas

import { apiRequest, API_CONFIG } from '@/config/api';
import { Task, TaskDTO, TaskStatus } from '@/types';

export const taskService = {
  // Criar nova tarefa
  async createTask(taskData: TaskDTO): Promise<Task> {
    return apiRequest<Task>(API_CONFIG.ENDPOINTS.TASKS, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  // Listar todas as tarefas
  async getAllTasks(): Promise<Task[]> {
    return apiRequest<Task[]>(API_CONFIG.ENDPOINTS.TASKS, {
      method: 'GET',
    });
  },

  // Listar tarefas por usuário
  async getTasksByUser(userId: number): Promise<Task[]> {
    return apiRequest<Task[]>(`${API_CONFIG.ENDPOINTS.TASKS}/user/${userId}`, {
      method: 'GET',
    });
  },

  // Atualizar tarefa completa
  async updateTask(id: number, taskData: TaskDTO): Promise<Task> {
    return apiRequest<Task>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  // Atualizar apenas o status da tarefa
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return apiRequest<Task>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}/status?status=${status}`, {
      method: 'PUT',
    });
  },

  // Deletar tarefa
  async deleteTask(id: number): Promise<void> {
    return apiRequest<void>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`, {
      method: 'DELETE',
    });
  },

  // Filtrar tarefas por status
  async getTasksByStatus(userId: number, status: TaskStatus): Promise<Task[]> {
    const tasks = await this.getTasksByUser(userId);
    return tasks.filter(task => task.status === status);
  },

  // Contar tarefas por status para um usuário
  async getTaskCountsByStatus(userId: number): Promise<{
    pendente: number;
    emAndamento: number;
    concluida: number;
    total: number;
  }> {
    const tasks = await this.getTasksByUser(userId);
    
    return {
      pendente: tasks.filter(task => task.status === TaskStatus.PENDENTE).length,
      emAndamento: tasks.filter(task => task.status === TaskStatus.EM_ANDAMENTO).length,
      concluida: tasks.filter(task => task.status === TaskStatus.CONCLUIDA).length,
      total: tasks.length
    };
  }
};
