FROM node:20 AS test-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci --include=dev

RUN npm run test

RUN rm -rf node_modules

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000/ 

RUN npm run build

FROM nginx:1.25-alpine
# if need to debug with bash, alpine (aka lightweight) will not include it so install full nginx instead
# FROM nginx 

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# no need for CMD, nginx starts up on its own

# docker build -t frontend . 
# docker build --target build-stage -t frontend . # to stop at the build stage
# docker container run --name frontend --rm -p 5173:80 frontend
# docker container run -it --name frontend --rm -p 5173:80 frontend bash # need nginx, nginx:alpine does not include bash
# docker image ls, docker image rm xx, docker builder prune # to remove the cache