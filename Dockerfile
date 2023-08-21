FROM node:16.17.0-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=root:root  . /usr/src/app
RUN npm ci --only=production
USER root
EXPOSE 3000
CMD [ "npm", "start" ]
