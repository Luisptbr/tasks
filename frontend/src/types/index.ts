// Tipos para as entidades do sistema

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Opcional pois não deve ser retornado do backend
}

export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export enum TaskStatus {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA'
}

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  user: User;
}

export interface TaskDTO {
  description: string;
  userId: number;
  status?: TaskStatus;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
