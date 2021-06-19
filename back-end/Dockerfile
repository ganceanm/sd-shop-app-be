FROM node:14.4-alpine3.10 AS development

WORKDIR /usr/src/app

ADD package*.json ./

RUN npm install 
RUN npm install rimraf

ADD . .

RUN npm run build


FROM node:14.4-alpine3.10 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

ADD package*.json ./

RUN npm install --only=production

ADD . .

COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]