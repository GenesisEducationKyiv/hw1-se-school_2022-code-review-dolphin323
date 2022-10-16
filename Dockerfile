FROM node
WORKDIR /src/server

COPY package.json /src/server

RUN npm install

COPY . .

EXPOSE 3000

VOLUME [ "/server/data" ]

RUN npm run build

CMD ["npm", "start"]