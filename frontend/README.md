# Frontend - Sistema de Gerenciamento de Tarefas

Interface web desenvolvida em Next.js para gerenciamento de usuários e tarefas.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Context API para gerenciamento de estado

## Pré-requisitos

- Node.js 18 ou superior instalado
- npm ou yarn
- Backend rodando em http://localhost:8080

## Como Executar

1. Abra o terminal no diretório do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## Scripts Disponíveis

- `npm run dev` - Executa a aplicação em modo de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Executa a aplicação em modo de produção
- `npm run lint` - Executa o linting do código

## Funcionalidades

- **Autenticação**: Login e registro de usuários
- **Dashboard**: Visão geral das tarefas com estatísticas
- **Gerenciamento de Tarefas**: 
  - Criar, editar e excluir tarefas
  - Alterar status (Pendente, Em Andamento, Concluída)
  - Filtrar tarefas por status
- **Interface Responsiva**: Otimizada para desktop e mobile
- **Tema Escuro**: Interface com design moderno

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                 # Páginas da aplicação (App Router)
│   │   ├── dashboard/       # Dashboard principal
│   │   └── login/          # Página de login
│   ├── config/             # Configurações da API
│   ├── contexts/           # Context API (AuthContext)
│   ├── services/           # Serviços para comunicação com API
│   └── types/              # Tipos TypeScript
├── public/                 # Arquivos estáticos
└── package.json           # Dependências e scripts
```

## Integração com Backend

O frontend se comunica com o backend através de uma API REST. Certifique-se de que o backend esteja rodando em http://localhost:8080 antes de iniciar o frontend.

## Observações

- A autenticação é gerenciada através do Context API
- O estado do usuário é persistido no localStorage
- As rotas são protegidas por middleware
- Para fins de estudo, a autenticação é simplificada
