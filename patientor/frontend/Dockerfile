# possibly add a test stage
FROM node:20.9.0-bullseye-slim AS build-stage 
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node package* ./
RUN npm ci --omit=dev 
COPY --chown=node:node . .
RUN npm run build
USER node

FROM nginx:1.25-alpine
# using default port 80 and /usr/share/nginx/html for nginx so no nginx.conf necessary
# COPY  ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html