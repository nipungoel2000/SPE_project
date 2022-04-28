FROM node:16-alpine

WORKDIR /caretaker-server

COPY package*.json ./

RUN npm install
RUN npm audit fix --force
COPY . .

EXPOSE 3001
CMD [ "npm", "run", "dev" ]