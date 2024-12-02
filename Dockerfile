FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
RUN npm prune --production

FROM node:18-alpine
LABEL maintainer1="Rémi Caulier"
LABEL maintainer2="Robin Lafontaine"
LABEL maintainer3="Sylvain Sausse"
LABEL maintainer4="Yann Verkimpe"
LABEL maintainer5="Maxime Zimmermann"

WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]