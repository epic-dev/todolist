import { ToDosController } from "../controllers";
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/add', authMiddleware, ToDosController.addNewToDo);
router.get('/fetch', authMiddleware, ToDosController.fetchAllToDos);
router.get('/fetch/:id', authMiddleware, ToDosController.fetchToDoById);
router.patch('/toggle/:id', authMiddleware, ToDosController.toggleToDo);
router.delete('/remove/:id', authMiddleware, ToDosController.removeToDo);
router.patch('/update/:id', authMiddleware, ToDosController.updateToDoLabel);

export default router;