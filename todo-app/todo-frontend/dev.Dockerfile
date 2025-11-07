FROM node:20 

WORKDIR /usr/src/app

COPY . .

# RUN npm install
# the host node_modules will be used with volumes

# if backend runs on host
# ENV VITE_BACKEND_URL=http://localhost:3000/ 
# if backend runs in  container with reverse proxy
ENV VITE_BACKEND_URL=http://localhost:8080/api

CMD npm run dev 
# -- --host not necessary, taken care of in vite.config.js
