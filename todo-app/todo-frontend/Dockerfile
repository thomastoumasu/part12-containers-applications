FROM node:20 AS test-stage 
WORKDIR /usr/src/app
COPY . .
RUN npm ci --include=dev
RUN npm run test
RUN rm -rf node_modules

# minimal working
# FROM node:20 AS build-stage 
# WORKDIR /usr/src/app
# COPY --from=test-stage /usr/src/app .
# RUN npm ci
# # if not with reverse proxy
# # ENV VITE_BACKEND_URL=http://localhost:3000/ 
# ENV VITE_BACKEND_URL=http://localhost:8080/api
# RUN npm run build

FROM node:20.9.0-bullseye-slim AS build-stage 
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node package* ./
RUN npm ci --omit=dev 
COPY --chown=node:node . .
ENV VITE_BACKEND_URL=http://localhost:8080/api
RUN npm run build
USER node

FROM nginx:1.25-alpine
# using default port 80 and /usr/share/nginx/html for nginx so no nginx.conf necessary
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
# no need for CMD, nginx starts up on its own
