
FROM node:22-alpine3.19

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm -f i npm-run-all

COPY . .

EXPOSE 3000

CMD ["npm", "start"]