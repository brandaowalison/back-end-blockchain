# back-end-blockchain

API back-end para fins educacionais — gerenciamento de usuários, consumo de energia, créditos de carbono, emissões, fontes de emissão, frota de veículos e transações de compensação.

## Sumário
- **Descrição**
- **Requisitos**
- **Instalação**
- **Variáveis de ambiente**
- **Como rodar**
- **Documentação Swagger**
- **Endpoints principais (resumo)**
- **Exemplos (cURL)**
- **Observações**

## Descrição
Este projeto é um back-end em Node.js/Express com MongoDB (Mongoose) para gerenciamento de recursos ligados a emissão e compensação. Inclui autenticação JWT, hashing de senhas e documentação Swagger.

## Requisitos
- Node.js (v16+ recomendado)
- npm
- MongoDB (URI de conexão)

## Instalação
1. Clone o repositório:

```powershell
git clone https://github.com/brandaowalison/back-end-blockchain.git
cd back-end-blockchain
```

2. Instale dependências:

```powershell
npm install
```

## Variáveis de ambiente
Crie um arquivo `.env` na raiz com (exemplo):

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDB
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

Observações:
- `MONGODB_URI` é obrigatório para a conexão com o MongoDB.
- `JWT_SECRET` é necessário para gerar/validar tokens JWT.

## Como rodar
- Ambiente de desenvolvimento (usa `nodemon`):

```powershell
npm run dev
```

- Para rodar em produção:

```powershell
node server.js
```

Se a aplicação não iniciar, verifique as variáveis de ambiente e a conexão com o MongoDB.

## Documentação Swagger
A documentação interativa está disponível em: `http://localhost:<PORT>/api-docs` (ex.: `http://localhost:3000/api-docs`).

## Endpoints principais (resumo)
Base: `/api`

- `/api/usuario` (POST) — criar usuário
	- Corpo (JSON): `{ "perfil": "empresa|individuo|admin", "nome": "Nome", "email": "ex@dominio.com", "senha": "senha123", "walletAddress": "opcional", "saldoCompra" }`
	- Resposta: 201 com objeto do usuário (senha não é retornada)

- `/api/usuario/login` (POST) — login
	- Corpo (JSON): `{ "email": "ex@dominio.com", "senha": "senha123" }`
	- Resposta: 200 com `token` JWT e dados do usuário

- `/api/usuario` (GET) — listar usuários (protegido)
	- Requer header `Authorization: Bearer <token>` e perfil `admin`

- `/api/usuario/:id` (GET) — obter usuário por id (protegido)
	- Permissões: `individuo`, `empresa`, `admin` — depende de `authorize`

- `/api/usuario/:id` (PUT) — atualizar usuário (protegido, `admin`)

- `/api/usuario/:id` (DELETE) — deletar usuário (protegido, `admin`)

Outras rotas presentes no projeto (exemplos):
- `/api/Consumo` — consumo de energia
- `/api/Credito` — créditos de carbono
- `/api/Emissao` — emissões
- `/api/FonteEmissao` — fontes de emissão
- `/api/FrotaVeiculo` — frota de veículos
- `/api/Transacao` — transações de compensação
- `/api/Projeto` — projeto energetico

Consulte `src/router` para detalhes de cada rota e `src/controllers` para o comportamento exato.

## Exemplos (cURL)

- Criar usuário:

```bash
curl -X POST http://localhost:3000/api/usuario \
	-H "Content-Type: application/json" \
	-d '{"perfil":"individuo","nome":"João","email":"joao@exemplo.com","senha":"senha123"}'
```

- Login (receber token):

```bash
curl -X POST http://localhost:3000/api/usuario/login \
	-H "Content-Type: application/json" \
	-d '{"email":"joao@exemplo.com","senha":"senha123"}'
```

Resposta de sucesso (exemplo):

```json
{
	"message": "Login bem-sucedido",
	"usuario": { "id": "...", "nome": "João", "email": "joao@exemplo.com", "perfil": "individuo" },
	"token": "eyJhbGciOi..."
}
```

- Chamar endpoint protegido usando o token:

```bash
curl -X GET http://localhost:3000/api/usuario \
	-H "Authorization: Bearer eyJhbGciOi..."
```

## Observações e sugestões
- O modelo `Usuario` faz hash de `senha` no `pre('save')` e gera JWT com `gerarTokenJWT()`.
- `src/db/connect.js` foi ajustado para relançar erro em falha de conexão — o servidor não deve subir se não houver conexão com o DB.
- Melhorias sugeridas:
	- Tratar erro de e-mail duplicado em `criarUsuario` para retornar 400 com mensagem clara (atualmente o erro vem do Mongo/Mongoose).
	- Validar variáveis de ambiente no startup e abortar com mensagem clara se faltarem.
	- Adicionar testes automatizados e script `start` no `package.json` (atualmente `dev` usa `nodemon`).

## Licença
Projeto licenciado sob a licença MIT (ver `LICENSE`).

