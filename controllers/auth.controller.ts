import { Request, Response } from "express";
import usersModel from "../models/users.model.js";

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log("EMAIL IS ", email);
    const user = await usersModel.findOne({ email });
    if (!user) {
      const newUser = new usersModel(req.body);
      await newUser.save();
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.log("ERROR IS ", error);
    res.status(500).json({ error: error.message });
  }
};

const userSignup = async (req: Request, res: Response) => {
  try {
    const user = new usersModel(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { userLogin, userSignup };
