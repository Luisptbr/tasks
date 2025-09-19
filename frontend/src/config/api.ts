// Configuração da API do backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    USERS: '/users',
    TASKS: '/tasks'
  }
};

// Função helper para fazer requisições HTTP
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    // Verifica se a resposta tem conteúdo antes de tentar fazer parse do JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Se não há conteúdo JSON, retorna void como T
      return undefined as T;
    }
  } catch (error) {
    console.error(`Erro na requisição para ${url}:`, error);
    throw error;
  }
}
