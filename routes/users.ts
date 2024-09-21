import express, { Request, Response } from "express";
import { addHandle, deleteUserHandle, getUser, getUserHandles, getUserHandlesById, updateUserHandle } from "../controllers/users.controller.js";

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

userRouter.get("/handles/byId/:id", (req: Request, res: Response) => {
  getUserHandlesById(req, res);
});

userRouter.put("/handles", (req: Request, res: Response) => {
  updateUserHandle(req, res);
});

userRouter.delete("/handles", (req: Request, res: Response) => {
  // Delete handle
  deleteUserHandle(req, res);
});

export default userRouter;
