FROM node:14-alpine


WORKDIR /usr/src/app

COPY . /usr/src/app

USER node

RUN npm ci --only=production


EXPOSE 3000

CMD [ "npm", "start" ]
