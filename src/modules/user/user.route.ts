import { Router, type Request, type Response } from "express";
import app from "../../app.ts";
import { pool } from "../../db/index.ts";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUserById,
} from "./user.controller.ts";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUser);

export const userRoute: Router = router;
