import express, { Request, Response } from "express";
import { userLogin, userSignup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signin", (req: Request, res: Response) => {
  userLogin(req, res);
});

authRouter.get("/signup", (req: Request, res: Response) => {
  userSignup(req, res);
});

export default authRouter;
