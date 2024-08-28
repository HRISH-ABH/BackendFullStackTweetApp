import { Request, Response } from "express";
import {
  getUserRepo,
  updateUserRepo,
  deleteUserRepo,
  createUserRepo,
} from "../repositories/user.repository";
import { IUserInterface } from "../database/interfaces/user.interface";

export const getUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  console.log(userId);

  try {
    const user = await getUserRepo(userId);
    if (user) {
      return res.status(200).json({ data: user }); // Use return to ensure no further code is executed
    } else {
      return res.status(404).json({ error: "User not found" }); // 404 for not found errors
    }
  } catch (error) {
    console.error(error); // Use console.error for error logging
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserInterface = req.body;

  try {
    const success = await createUserRepo(user);
    if (success) {
      return res.status(201).json({ data: user }); // 201 for created resources
    } else {
      return res.status(500).json({ error: "User not created" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const updatedUser: IUserInterface = req.body;

  try {
    const success = await updateUserRepo(updatedUser.uid, updatedUser);
    if (success) {
      return res.status(200).json({ data: updatedUser });
    } else {
      return res.status(404).json({ error: "User not found" }); // Use 404 if the user is not found for updating
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  try {
    const success = await deleteUserRepo(userId);
    if (success) {
      return res.status(200).json({ data: "User deleted" });
    } else {
      return res.status(404).json({ error: "User not found" }); // Use 404 if the user is not found for deletion
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
