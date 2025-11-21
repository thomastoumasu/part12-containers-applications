FROM node:20-alpine
ENV NODE_ENV production

# WORKDIR /usr/src/app
# COPY --chown=node:node . .
# RUN npm ci --omit=dev && npm run build
# USER node

# better: cache dependencies
WORKDIR /usr/src/app
COPY --chown=node:node package* ./
RUN npm ci --omit=dev 
COPY --chown=node:node . .
RUN npm run build
USER node

# = npm start
CMD ["node", "build/src/index.js"]  

