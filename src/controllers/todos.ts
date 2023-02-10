import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [
  // { id: 1, text: "Task 1", completed: false },
  // { id: 2, text: "Task 2", completed: true },
  // { id: 3, text: "Task 3", completed: false },
];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const completed = false;
  const id = Math.floor(Math.random() * 100) + 1;

  const newTodo = new Todo(id, text, completed);
  TODOS.push(newTodo);
  console.log("All", TODOS);
  res.status(201).json({
    msg: "New Todo Createed",
    length: TODOS.length,
    createdTodo: newTodo,
  });
};
export const getAllTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({
    msg: "List of All Todos",
    length: TODOS.length,
    AllTodos: TODOS,
  });
};

export const updateTodo: RequestHandler<{
  id: number;
}> = (req, res, next) => {
  const todoId = req.params.id;
  const { text, completed } = req.body as { text: string; completed: boolean };
  const todoIndex = TODOS.findIndex((todo) => todo.id === Number(todoId));
  if (todoIndex < 0) {
    throw new Error(`No Todo with id ${todoId}`);
  }
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text, completed);
  res.status(200).json({
    msg: "Todo Updated",
    AllTodos: TODOS,
  });
};

export const deleteTodo: RequestHandler<{ id: number }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === Number(todoId));
  if (todoIndex < 0) {
    throw new Error(`No Todo with id ${todoId}`);
  }
  TODOS.splice(todoIndex, 1);
  res.status(200).json({
    msg: "Todo Deleted",
    AllTodos: TODOS,
  });
};
