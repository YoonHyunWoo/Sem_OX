FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY code/socket.js ./socket.js

EXPOSE 3000:3000

CMD [ "node", "socket.js"]