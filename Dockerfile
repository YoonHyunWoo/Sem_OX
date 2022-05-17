FROM public.ecr.aws/docker/library/node:16.13.0

WORKDIR /node/app

COPY code/socket.js ./socket.js

COPY pack*.json ./

RUN npm install

EXPOSE 3000:3000

CMD [ "node", "socket.js" ]