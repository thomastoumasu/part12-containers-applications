cd todo-app/todo-backend
# should be already running docker compose -f docker-compose.dev.yml up -d --build
docker container ls
docker exec -it xx bash
redis-cli
KEYS *
GET added_todos
SET added_todos 9001
GET added_todos
DEL added_todos
docker compose -f docker-compose.dev.yml down --volumes


