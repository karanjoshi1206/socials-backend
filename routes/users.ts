import express, { Request, Response } from "express";
import { addHandle, getUser, getUserHandles } from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.get("/:email", (req: Request, res: Response) => {
  getUser(req, res);
});

userRouter.post("/addHandle", (req: Request, res: Response) => {
  addHandle(req, res);
});

userRouter.get("/handles/:email", (req: Request, res: Response) => {
  getUserHandles(req, res);
});

export default userRouter;
