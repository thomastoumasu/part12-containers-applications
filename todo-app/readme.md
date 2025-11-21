## Frontend and backend for todo-app, containerized, both accessible from localhost:8080 through a nginx reverse proxy.

Ex 12.5 to 12.20

### To run the containerized app in production mode:

docker compose up

### To run the containerized app in development mode (hot reload works for both front and backend):

docker compose -f compose.dev.yaml up

(Note: src and nodes_modules are bind mounted inside the container, so a "npm install" is required locally on the host before the first run. If the host is a Mac M1, also need to install the linux version of @rollup/rollup into the host node_modules, see docker-compose.dev.yml in todo-frontend folder for details).
