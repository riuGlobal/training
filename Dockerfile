FROM node:dubnium-alpine
LABEL mainteiner='Ricardo David Ortiz'
WORKDIR /var/www/html/training
COPY package*.json ./
RUN npm install
COPY ./ ./
ENV NODE_ENV_FILE=.env.dev
EXPOSE 4000
CMD cp ${NODE_ENV_FILE} .env && npm run start