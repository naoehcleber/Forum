FROM node:22.14.0-alpine

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE $PORT

CMD ["npm", "start"]
