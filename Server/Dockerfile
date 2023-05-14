FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3500

CMD ["npm", "start"]
