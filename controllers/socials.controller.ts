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

const getSocial = async (req: Request, res: Response) => {
  console.log("SOCIAL ID IS ", req.params.id);
  try {
    const social = await Socials.findById(req.params.id);
    if (social) {
      res.status(200).json(social);
    }
  } catch (error: any) {
    res.status(404).json({ message: "Social not found" });
  }
}

export  {createSocial, getDefaults,getSocial}; 