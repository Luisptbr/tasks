# Sistema de Gerenciamento de Tarefas

[![Java](https://img.shields.io/badge/Java-17-orange)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Projeto de estudos desenvolvido por Luis Henrique.

Sistema completo de gerenciamento de tarefas e usuários, com backend em Spring Boot e frontend em Next.js.

## Arquitetura

O projeto está dividido em duas partes principais:

### Backend (Spring Boot)
- Localização: `backend/`
- Porta: 8080
- Banco de dados: PostgreSQL
- APIs REST para usuários e tarefas
- Documentação Swagger disponível

### Frontend (Next.js)
- Localização: `frontend/`
- Porta: 3000
- Framework: Next.js 15 com TypeScript
- Estilização: Tailwind CSS
- Interface responsiva com tema escuro

## Como Executar

### Pré-requisitos
- Java 17 ou superior
- Node.js 18 ou superior
- PostgreSQL instalado e rodando
- Maven

### 1. Configurar o Banco de Dados
```sql
CREATE DATABASE tasks;
```

### 2. Executar o Backend
```bash
cd backend
mvn spring-boot:run
```

O backend estará disponível em: http://localhost:8080

### 3. Executar o Frontend
```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: http://localhost:3000

## Funcionalidades

### Backend
- API REST para gerenciamento de usuários
- API REST para gerenciamento de tarefas
- Integração com banco PostgreSQL
- Documentação automática com Swagger
- Configuração CORS para comunicação com frontend

### Frontend
- Autenticação de usuários (login e registro)
- Dashboard com estatísticas das tarefas
- CRUD completo de tarefas
- Filtros por status da tarefa
- Interface responsiva com tema escuro
- Proteção de rotas

## Tecnologias Utilizadas

### Backend
- Spring Boot 3.5.5
- Spring Data JPA
- PostgreSQL
- SpringDoc OpenAPI (Swagger)
- Maven

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Context API

## Estrutura de Dados

### Usuário
- ID, nome, email e senha

### Tarefa
- ID, descrição, status (Pendente/Em Andamento/Concluída) e usuário

## URLs Úteis

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Documentação Swagger: http://localhost:8080/swagger-ui.html

## Observações

- Projeto desenvolvido para fins de estudo
- Autenticação simplificada (sem JWT)
- Banco de dados criado automaticamente
- Estado do usuário persistido no localStorage

## Documentação Detalhada

Para instruções detalhadas de cada parte do projeto:
- Backend: Consulte `backend/README.md`
- Frontend: Consulte `frontend/README.md`

## Contribuindo

Contribuições são sempre bem-vindas! Consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para saber como contribuir.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

**Luis Henrique** - Projeto de estudos para desenvolvimento full-stack
