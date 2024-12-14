# Usar uma imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o código do projeto para o diretório de trabalho do contêiner
COPY . .

# Expor a porta 3000 (ou a porta usada no servidor)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
