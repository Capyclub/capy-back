FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm run db:seed


CMD ["npm", "run", "start:dev"]