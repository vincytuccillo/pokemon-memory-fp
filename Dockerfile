FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app/node_modules

WORKDIR /home/node/app

COPY . .

USER node

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
