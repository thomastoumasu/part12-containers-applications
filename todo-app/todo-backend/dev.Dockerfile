# to run npm run dev in a container, being able to access the code in VS -- using volumes
# build image named hello-front from the dockerfile in this folder:
  # docker build -f dev.Dockerfile -t backend-dev . 
  # docker container run -it --name backend-dev --rm -p 3000:3000 backend-dev bash
  # docker container run --name backend-dev --rm -p 3000:3000 -v "$(pwd):/usr/src/app/" backend-dev

# use existing image as basis
FROM node:20

# create work dir to avoid destroying existing files on the container
WORKDIR /usr/src/app

# copy code to the image. files marked in .dockerignore will not be copied.
COPY . .

# install files within the image
# RUN npm install

# specify what will be executed when container built from the image is started
CMD ["npm", "run", "dev"] 

