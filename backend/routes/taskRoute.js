import express from "express";
import {
  getTask,
  getHighPrioritytask,
  getCompletedTask,
  getIncompletetask,
  addTask,
  updateStatus,
  deleteTask,
  updateTask
} from "../controller/taskController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/task", authenticate, getTask);
router.get("/high-task", authenticate, getHighPrioritytask);
router.get("/complete-task", authenticate, getCompletedTask);
router.get("/incomplete-task", authenticate, getIncompletetask);
router.post("/task", authenticate, authorize, addTask);
router.put("/edit/:id", authenticate, updateStatus);
router.patch("/update/:id",authenticate,authorize,updateTask)
router.delete("/task-delete/:id", authenticate, authorize, deleteTask);

export default router;
