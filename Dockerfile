FROM node:16.17.0-bullseye-slim


WORKDIR /usr/src/app

COPY . /usr/src/app

USER node

RUN npm ci --only=production


EXPOSE 3000

CMD [ "npm", "start" ]
