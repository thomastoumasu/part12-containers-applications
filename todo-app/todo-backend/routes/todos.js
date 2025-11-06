const express = require("express");
const { Todo } = require("../mongo");
const { getAsync, setAsync } = require("../redis");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
  console.log("todos: ", todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
  const logRedis = await getAsync("added_todos");
  await setAsync("added_todos", logRedis ? Number(logRedis) + 1 : 1);
});

/* GET number of todos */
router.get("/statistics", async (_, res) => {
  const logRedis = await getAsync("added_todos");
  const added_todos = logRedis ? Number(logRedis) : 0;
  console.log("redis added_todos", added_todos);
  res.send({ added_todos });
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);
  } catch (error) {
    next(error);
  }
  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo._id,
    { done: true },
    { new: true, useFindAndModify: false }
  );
  if (!updatedTodo) {
    return res.sendStatus(410); // gone
  } else {
    return res.sendStatus(204); // succesfully updated
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
