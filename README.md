# Lapso API

API do restaurante Lapso — Alta gastronomia brasileira, menu degustação.

## Deploy

https://lapso-api.onrender.com

## Documentação

https://lapso-api.onrender.com/api-docs

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + bcrypt
- RBAC (Role-Based Access Control)
- Swagger/OpenAPI
- Pug (template engine)

## Como rodar localmente

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Crie o arquivo `.env` baseado no `.env.example`
4. Rode o servidor: `npm run dev`

## Rotas

### Públicas
- GET /api/menus
- GET /api/menus/:id
- GET /api/reservas
- GET /api/reservas/:id

### Autenticação
- POST /api/auth/register
- POST /api/auth/login

### Protegidas (admin)
- POST /api/menus
- PUT /api/menus/:id
- DELETE /api/menus/:id
- POST /api/reservas
- PUT /api/reservas/:id
- DELETE /api/reservas/:id