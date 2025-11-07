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

# # use from Dockerfile folder as
# # build image named backend from the dockerfile in . (aka here):
# cd todo-app/todo-backend
# docker build -t backend . (or todo-app/todo-backend instead of if run from another folder)
# # run container from image backend, name it backend, remove it when it stops, set the (local)host:application ports:
# docker container run --name backend --rm -p 3000:3000 backend
# # or do the same in interactive mode (f.e. to check if files are there). Bash at the end overwrites the CMD in dockerfile.
# docker container run -it --name backend --rm -p 3000:3000 backend bash
