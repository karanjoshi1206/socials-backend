import { Request, Response } from "express";
import Users from "../models/users.model.js";
import Socials from "../models/socials.model.js";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({ email: req.params.email }).populate("socialHandles.platform");
    if (user) {
      res.status(200).json(user);
    }
  } catch (error: any) {
    console.log("error is ", error);
    res.status(404).json({ message: "User not found" });
  }
};

const addHandle = async (req: Request, res: Response) => {
  try {
    const { userId, socialPlatformId, handle } = req.body;

    // Find user and social platform by IDs
    const user = await Users.findById(userId);
    const socialPlatform = await Socials.findById(socialPlatformId);

    if (!user || !socialPlatform) {
      return res.status(404).json({ message: "User or Social Platform not found" });
    }

    // Add the social handle to the user's socialHandles array
    user.socialHandles.push({
      platform: socialPlatform._id,
      handle: handle
    });

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Social handle added successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserHandles = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({ email: req.params.email }).populate("socialHandles.platform");
    if (user) {
      res.status(200).json({
        username: user.userName,
        name: user.name,
        handles:user.socialHandles
      });
    }
  } catch (error: any) {
    console.log("error is ", error);
    res.status(404).json({ message: "User not found" });
  }
};

export { getUser, addHandle, getUserHandles };
