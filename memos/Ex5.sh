# # look at the folder structure inside the container (overwrite CMD in dockerfile):
# docker build -t todo-backend todo-app/todo-backend
# docker run -it --rm todo-backend bash

docker build -t todo-backend todo-app/todo-backend && docker container run --name todo-backend --rm -p 3010:3000 todo-backend
