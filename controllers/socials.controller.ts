import { Response ,Request} from "express";
import Socials from "../models/socials.model.js";

const createSocial = async (req: Request, res: Response) => {
  try {
    const social = new Socials(req.body);
    await social.save();
    res.status(201).json(social);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getDefaults = async (req: Request, res: Response) => {
  try {
    const socials = await Socials.find()
    res.status(200).json(socials);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export  {createSocial, getDefaults}; 