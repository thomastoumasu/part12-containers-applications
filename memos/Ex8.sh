cd todo-app/todo-backend
docker compose -f docker-compose.dev.yml up -d --build
docker container ls
docker exec -it xx bash
mongosh -u root -p example
show dbs
use the_database
show collections
db.todos.find({})
db.todos.insertOne({ text: "Increase the number of tools in my tool belt", done: false })
db.todos.find({})
docker compose -f docker-compose.dev.yml down --volumes


