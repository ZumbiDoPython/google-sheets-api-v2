# API com Google Sheets

Esta aplicação Node.js conecta-se ao Google Sheets e fornece endpoints para acessar, atualizar e adicionar dados.

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie o arquivo `credentials.json` na raiz do projeto.

3. Inicie o servidor:
   ```bash
   npm start
   ```

## Rotas disponíveis

- `GET /api/data`: Retorna os dados da planilha.
- `PUT /api/data`: Atualiza uma célula específica na planilha.
- `POST /api/data`: Adiciona uma nova linha à planilha.
