# add a test stage
FROM node:20-alpine AS build-stage 
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci && npm run build

FROM nginx:1.25-alpine
# using default port 80 and /usr/share/nginx/html for nginx so no nginx.conf necessary
# COPY  ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html