# docker file to run backend in container
# use existing image as basis
FROM node:20-alpine

# create work dir to avoid destroying existing files on the container
WORKDIR /usr/src/app

# copy code to the image. files marked in .dockerignore will not be copied.
COPY --chown=node:node . .

# install files within the image
RUN npm ci

# set user with low permissions
USER node

# specify what will be executed when container built from the image is started
CMD npm start
