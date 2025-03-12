# Etapa de build: utiliza imagem Node para instalar e compilar o código
FROM node:21-alpine AS build
WORKDIR /app
# Copia package.json e package-lock.json (ou yarn.lock) para instalar dependências
COPY package*.json ./
# Instala as dependências
RUN npm install
# Copia o restante do código-fonte
COPY . .
# Realiza o build da aplicação (o Vite por padrão gera a pasta "dist")
RUN npm run build

# Etapa final: utiliza o Nginx para servir os arquivos estáticos
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
