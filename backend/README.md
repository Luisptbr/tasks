# Backend - Sistema de Gerenciamento de Tarefas

API REST desenvolvida em Spring Boot para gerenciamento de usuários e tarefas.

## Tecnologias

- Java 17
- Spring Boot 3.5.5
- Spring Data JPA
- PostgreSQL
- Maven
- SpringDoc OpenAPI (Swagger)

## Pré-requisitos

- Java 17 ou superior instalado
- PostgreSQL instalado e em execução
- Maven instalado

## Configuração do Banco de Dados

1. Acesse o PostgreSQL e crie o banco de dados:

```sql
CREATE DATABASE tasks;
```

2. Configure as credenciais do banco no arquivo `src/main/resources/application.properties` (se necessário).

## Como Executar

1. Abra o terminal no diretório do backend:

```bash
cd backend
```

2. Execute a aplicação usando Maven:

```bash
mvn spring-boot:run
```

A aplicação estará disponível em: http://localhost:8080

## Endpoints Principais

- **Usuários**: `/users`
  - GET /users - Listar todos os usuários
  - POST /users - Criar novo usuário
  - GET /users/{id} - Buscar usuário por ID
  - PUT /users/{id} - Atualizar usuário
  - DELETE /users/{id} - Excluir usuário

- **Tarefas**: `/tasks`
  - GET /tasks - Listar todas as tarefas
  - POST /tasks - Criar nova tarefa
  - GET /tasks/{id} - Buscar tarefa por ID
  - PUT /tasks/{id} - Atualizar tarefa
  - DELETE /tasks/{id} - Excluir tarefa
  - GET /tasks/user/{userId} - Buscar tarefas por usuário
  - PUT /tasks/{id}/status - Atualizar status da tarefa

## Documentação da API

Após executar a aplicação, acesse a documentação Swagger em:

- Interface Swagger: http://localhost:8080/swagger-ui.html
- JSON da API: http://localhost:8080/api-docs

## Estrutura do Projeto

```
backend/
├── src/main/java/com/dev/tasks/
│   ├── config/         # Configurações (CORS, etc.)
│   ├── controller/     # Controladores REST
│   ├── dto/           # Data Transfer Objects
│   ├── model/         # Entidades JPA
│   ├── repository/    # Repositórios JPA
│   └── service/       # Regras de negócio
└── src/main/resources/
    └── application.properties  # Configurações da aplicação
```

## Observações

- As tabelas do banco de dados são criadas automaticamente pelo Hibernate
- CORS está configurado para aceitar requisições do frontend (localhost:3000)
- Para fins de estudo, a autenticação é simplificada (sem JWT ou hash de senhas)
