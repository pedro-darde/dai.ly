FROM node:20.12.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
