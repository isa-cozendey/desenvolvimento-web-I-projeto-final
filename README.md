# Livraria Web - Projeto Final

Este projeto consiste numa aplicação Web completa para gestão de uma livraria, desenvolvida como trabalho final da disciplina de Desenvolvimento Web I. O sistema permite o cadastro de livros, gestão de utilizadores, avaliações e funcionalidades avançadas de interface e segurança.

## Funcionalidades Escolhidas
Além dos requisitos básicos (CRUD de livros e Autenticação), foram implementadas as seguintes funcionalidades avançadas:

### 1. Sistema de Avaliações (Reviews)

Tabela relacional de Reviews ligada a Livros e Utilizadores.

Utilizadores autenticados podem deixar notas (1-5 estrelas) e comentários nos livros.

Visualização da lista de comentários e notas individuais na página de detalhes.

### 2. Upload de Imagem de Capa

Implementação de upload de ficheiros reais usando Multer no Backend.

Armazenamento local na pasta uploads e referência no banco de dados SQLite.

Visualização da capa com ajuste automático de proporção (aspect-ratio) no Frontend.

### 3. Recuperação de Senha via E-mail

Sistema seguro "Ponta a Ponta" para redefinição de senha.

Utilização de tokens temporários com expiração (1 hora).

Integração com Nodemailer para envio de e-mails reais através do Gmail.

### 4. Tema Claro/Escuro (Dark Mode)

Implementação de Context API para gestão global do tema.

Utilização de Variáveis CSS para troca instantânea de cores.

Persistência da preferência do utilizador no localStorage.

Segurança/Utils: Bcrypt, Crypto, Nodemailer, Multer.

## Instruções para Executar o Sistema
Siga os passos abaixo para rodar o projeto:

Pré-requisitos:
Configuração de E-mail (Importante):
No .env, é necessário adicionar as credenciais para teste de envio de e-mail (necessário Senha de App do Gmail):

EMAIL_USER=seu_email_para_teste@gmail.com
EMAIL_PASS=senha_de_aplicativo_do_google

Agora é só rodar o servidor.
O banco de dados livraria.db será criado automaticamente na primeira execução.
Acesse o link: http://localhost:3000

Desenvolvido por: Isadora Menezes Cozendey
