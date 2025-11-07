# just copy Patientor_fullstack in this folder. Then
# use this script to build the image specified in Dockerfile and run the container
# or better, use the docker-compose.yml 
# # look at the folder structure inside the container (overwrite CMD in dockerfile):
# docker build -t my-patientor.
# docker run -it --rm my-patientor bash

docker build -t my-patientor . && docker run --rm -p 3010:3001 my-patientor
