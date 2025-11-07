FROM node:20 

WORKDIR /usr/src/app

COPY . .

# RUN npm install
# the host node_modules will be used with volumes

# if backend run on host
# ENV VITE_BACKEND_URL=http://localhost:3000/ 
# if backend run in  container with reverse proxy
ENV VITE_BACKEND_URL=http://localhost:8080/api

CMD npm run dev 
# -- --host not necessary, taken care of in vite.config.js

# docker build -t frontend-dev -f dev.Dockerfile . 
# docker container run --name frontend-dev -it --rm -p 5173:5173 -v "$(pwd):/usr/src/app/" frontend-dev bash

# docker image ls, docker image rm xx, docker builder prune # to remove the cache