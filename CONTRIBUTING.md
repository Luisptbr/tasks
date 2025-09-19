# Guia de Contribuição

Obrigado por considerar contribuir com o projeto Sistema de Gerenciamento de Tarefas!

## Como Contribuir

### 1. Fork o Repositório
```bash
git clone https://github.com/Luisptbr/tasks.git
cd tasks
```

### 2. Configurar o Ambiente

#### Backend
```bash
cd backend
# Configurar PostgreSQL
# CREATE DATABASE tasks;
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Criar uma Branch
```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

### 4. Fazer as Alterações
- Mantenha o código limpo e bem documentado
- Siga os padrões existentes do projeto
- Teste suas alterações

### 5. Commit e Push
```bash
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push origin feature/nova-funcionalidade
```

### 6. Abrir Pull Request
Abra uma PR com:
- Descrição clara das mudanças
- Screenshots se aplicável
- Referência a issues relacionadas

## Padrões de Commit

Use commits semânticos:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `refactor:` refatoração de código
- `test:` adição de testes

## Estrutura do Projeto

```
tasks/
├── backend/           # Spring Boot API
├── frontend/          # Next.js App
└── docs/             # Documentação
```

## Tecnologias

### Backend
- Java 17
- Spring Boot 3.5.5
- PostgreSQL
- Maven

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Dúvidas?

Abra uma issue ou entre em contato!
