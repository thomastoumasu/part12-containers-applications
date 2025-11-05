docker container run hello-world
# pick up the command to run an Ubuntu container, that we can interact with (-it), and that executes bash when it starts
docker run -it ubuntu bash
# then create a file
mkdir usr/src/app
cd $_
touch index.js
# then exit
exit