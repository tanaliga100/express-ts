import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todos";
const router = Router();

router.route("/").post(createTodo).get(getAllTodos);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

export default router;
