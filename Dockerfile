FROM node:18-alpine

LABEL maintainer1="Rémi Caulier"
LABEL maintainer2="Robin Lafontaine"
LABEL maintainer3="Sylvain Sausse"
LABEL maintainer4="Yann Verkimpe"
LABEL maintainer5="Maxime Zimmermann"

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]