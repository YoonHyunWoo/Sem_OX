FROM node:18-alpine

COPY pack*.json ./

RUN npm install

COPY code/socket.js ./socket.js

EXPOSE 3000:3000

CMD [ "node", "socket.js" ]