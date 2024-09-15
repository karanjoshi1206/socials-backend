import express, { Request, Response } from "express";
import { createSocial, getDefaults, getSocial } from "../controllers/socials.controller.js";

const socialRouter = express.Router();

socialRouter.post("/social", (req: Request, res: Response) => {
  createSocial(req, res);
});

socialRouter.get("/getDefault", (req: Request, res: Response) => {
  getDefaults(req, res);
});

socialRouter.get("/getSocial/:id", (req: Request, res: Response) => {
  getSocial(req, res);
});

export default socialRouter;
