```txt
# email-integrated-opportunity-evaluator-by-ai

Sistema full stack para gestão e avaliação inteligente de oportunidades utilizando IA.

A plataforma recebe propostas em PDF, utiliza OpenAI para realizar análises adversariais automáticas, gera scoring estratégico e permite workflow operacional completo com dashboard administrativo.

--------------------------------------------------

# Tecnologias Utilizadas

## Frontend
- React
- React Router DOM
- Axios
- Vite

## Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Multer
- Nodemailer
- OpenAI SDK

## Banco de Dados
- PostgreSQL

--------------------------------------------------

# Funcionalidades

- Upload de PDFs
- Extração automática de texto
- Integração com OpenAI
- Análise estratégica automática
- Score de oportunidades
- Veredito automático:
  - PASSAR
  - APROFUNDAR
  - AVANÇAR
- Dashboard administrativo
- Tela detalhada da oportunidade
- Workflow operacional
- Aprovação/Rejeição
- Envio automático de emails
- Persistência em banco PostgreSQL

--------------------------------------------------

# Arquitetura do Sistema

A arquitetura foi separada em frontend e backend independentes para permitir escalabilidade e desacoplamento da aplicação.

--------------------------------------------------

# Frontend

Responsável por:
- Interface do usuário
- Dashboard administrativo
- Upload de oportunidades
- Navegação entre páginas
- Visualização das análises

Estrutura:

frontend/
 ├── src/
 │    ├── pages/
 │    ├── components/
 │    ├── services/
 │    └── App.jsx

--------------------------------------------------

# Backend

Responsável por:
- API REST
- Upload de arquivos
- Processamento dos PDFs
- Integração com OpenAI
- Regras de negócio
- Persistência no banco
- Workflow operacional
- Envio de emails

Estrutura:

backend/
 ├── src/
 │    ├── controllers/
 │    ├── routes/
 │    ├── services/
 │    ├── middlewares/
 │    └── server.js

--------------------------------------------------

# Decisões de Arquitetura

## Separação Frontend / Backend

Foi adotada arquitetura desacoplada:
- React no frontend
- Node.js/Express no backend

Isso permite:
- manutenção simplificada
- escalabilidade
- deploy independente
- melhor organização do código

--------------------------------------------------

## Uso do Prisma ORM

O Prisma foi utilizado para:
- tipagem forte
- facilidade nas migrations
- produtividade
- segurança no acesso ao banco

--------------------------------------------------

## PostgreSQL

Escolhido por:
- robustez
- confiabilidade
- suporte relacional
- excelente integração com Prisma

--------------------------------------------------

## OpenAI

A OpenAI foi utilizada para:
- análise estratégica automática
- scoring de oportunidades
- geração de parecer adversarial

O sistema foi projetado com fallback automático caso a API esteja indisponível.

--------------------------------------------------

## Workflow Operacional

A aplicação separa:
- veredito da IA
- decisão humana operacional

Veredito IA:
- PASSAR
- APROFUNDAR
- AVANÇAR

Status Operacional:
- PENDING
- APPROVED
- REJECTED

Isso permite manter rastreabilidade entre recomendação automática e decisão humana.

--------------------------------------------------

# Como Executar o Projeto

1. Clonar repositório

git clone https://github.com/SEU_USUARIO/email-integrated-opportunity-evaluator-by-ai.git

--------------------------------------------------

2. Instalar Backend

cd backend
npm install

--------------------------------------------------

3. Configurar .env

Criar arquivo:

backend/.env

Conteúdo:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bpa"

PORT=5000

OPENAI_API_KEY=sua_chave

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=seu_email@gmail.com
MAIL_PASS=sua_senha_app

EVALUATOR_EMAIL=avaliador@gmail.com

FRONTEND_URL=http://localhost:5173

--------------------------------------------------

4. Rodar Prisma

npx prisma migrate dev

Depois:

npx prisma generate

--------------------------------------------------

5. Iniciar Backend

npm run dev

Backend:
http://localhost:5000

--------------------------------------------------

6. Instalar Frontend

Abrir outro terminal:

cd frontend
npm install

--------------------------------------------------

7. Iniciar Frontend

npm run dev

Frontend:
http://localhost:5173

--------------------------------------------------

# Fluxo da Aplicação

1. Usuário envia PDF
2. Backend recebe arquivo
3. PDF é processado
4. Texto é extraído
5. OpenAI gera análise
6. Resultado é salvo
7. Dashboard exibe oportunidade
8. Admin aprova/rejeita
9. Sistema envia emails

--------------------------------------------------

# Estrutura do Banco

Tabela Opportunity

| Campo | Tipo |
|---|---|
| id | String |
| fullName | String |
| email | String |
| phone | String |
| documentPath | String |
| analysis | String |
| score | Int |
| verdict | String |
| status | String |
| createdAt | DateTime |

--------------------------------------------------

# Melhorias Futuras

- Autenticação JWT
- Upload para S3
- Dashboard analytics
- Filtros avançados
- Histórico de avaliações
- Sistema multiusuário
- Deploy em produção
- Tailwind UI
- Charts e métricas

```
