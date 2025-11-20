FROM node:20-alpine
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci && npm run build
USER node
CMD npm start
