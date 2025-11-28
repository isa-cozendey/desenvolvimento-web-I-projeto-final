# Livraria Frontend

Frontend em React para o sistema de gerenciamento de livraria.

## 🚀 Tecnologias

- React 18
- React Router DOM
- Axios
- Vite

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Backend da livraria rodando em `http://localhost:3333`

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse a aplicação em: `http://localhost:3000`

## 📦 Build para produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist`.

## 🎯 Funcionalidades

- ✅ Sistema de autenticação (login/registro)
- ✅ Listagem de livros
- ✅ Criação de novos livros
- ✅ Edição de livros existentes
- ✅ Remoção de livros
- ✅ Interface responsiva

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
├── contexts/         # Contextos React (Auth)
├── pages/           # Páginas da aplicação
├── services/        # Serviços de API
├── App.jsx          # Componente principal
└── main.jsx         # Ponto de entrada
```

## 🔌 API

O frontend consome a API do backend através do proxy configurado no Vite:
- Base URL: `/api`
- Proxy para: `http://localhost:3333`

## 📝 Endpoints utilizados

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter usuário atual
- `POST /api/auth/logout` - Fazer logout
- `GET /api/livros` - Listar todos os livros
- `GET /api/livros/:id` - Buscar livro por ID
- `POST /api/livros` - Criar novo livro
- `PUT /api/livros/:id` - Atualizar livro
- `DELETE /api/livros/:id` - Remover livro
