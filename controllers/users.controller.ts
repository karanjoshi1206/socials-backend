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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, name, userName } = req.body;

    const updatedUser = await Users.findOneAndUpdate({ email: email }, { $set: { name: name, userName: userName } }, { new: true });

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error: any) {
    console.log("error is ", error?.codeName);
    if (error.codeName === "DuplicateKey") {
      return res.status(400).json({ message: "Username already exists" });
    }

    res.status(500).json({ message: "Something went wrong", error });
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

    // check for duplicate social handle
    const existingHandle = user.socialHandles.find((sh) => sh.platform?._id.toString() === socialPlatformId);
    if (existingHandle) {
      return res.status(400).json({ message: "Social handle already exists" });
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
        handles: user.socialHandles
      });
    }
  } catch (error: any) {
    console.log("error is ", error);
    res.status(404).json({ message: "User not found" });
  }
};
const getUserHandlesById = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.params.id).populate("socialHandles.platform");
    if (user) {
      res.status(200).json({
        username: user.userName,
        name: user.name,
        handles: user.socialHandles
      });
    }
  } catch (error: any) {
    console.log("error is ", error);
    res.status(404).json({ message: "User not found" });
  }
};

const updateUserHandle = async (req: Request, res: Response) => {
  try {
    const { email, platformId, handle } = req.body;

    const user = await Users.findOne({ email }).populate("socialHandles.platform");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await Users.findOneAndUpdate(
      {
        email: email,
        "socialHandles._id": platformId
      },
      {
        $set: {
          "socialHandles.$.handle": handle
        }
      },
      { new: true }
    );

    res.status(200).json({ message: "Social handle updated successfully", data: updatedUser });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteUserHandle = async (req: Request, res: Response) => {
  try {
    const { email, platformId } = req.body;

    const user = await Users.findOne({ email }).populate("socialHandles.platform");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updated = await Users.findOneAndUpdate({ email }, { $pull: { socialHandles: { _id: platformId } } }, { new: true });

    res.status(200).json({ message: "Social handle deleted successfully", data: updated });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { getUser, addHandle, getUserHandles, updateUserHandle, deleteUserHandle, getUserHandlesById, updateUser };
