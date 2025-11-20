## Frontend and backend for Patientor, containerized, both accessible from localhost:8080 through a nginx reverse proxy.

Difference to Patientor_Fullstack: package.json in both frontend and backend folder instead of only one common package.json.

### To run the containerized app in development mode (hot reload works for both front and backend):

docker compose -f compose.dev.yaml up

(code and nodes_modules are bind mounted inside the container, so a "npm install" is required on the host before the first run. If the host is a Mac M1, also need to install the linux version of @rollup/rollup into the host node_modules, see compose.dev.yaml for details).
Both frontend and backend can also be run separately, in this case add cors in the backend and recheck the backend url specified in the frontend under constants.ts. Check also the vite.config.ts if run outside of containers (host: "frontend-dev" matches the compose.dev.yaml file).

### To run the containerized app in production mode:

docker compose up

#### memo

copy . . should not be necessary in the Dockerfile.dev
