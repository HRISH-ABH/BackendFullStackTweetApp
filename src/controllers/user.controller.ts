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
      res.send(200).json({ data: user });
    } else {
      res.status(500).json({ error: "user not Found!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const createUserController = async (req: Request, res: Response) => {
  const user: IUserInterface = req.body;

  try {
    const success = await createUserRepo(user);
    if (success) {
      res.send(200).json({ data: user });
    } else {
      res.status(500).json({ error: "user not created!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const updateUserController = async (req: Request, res: Response) => {
  const updatedUser: IUserInterface = req.body;

  try {
    const success = await updateUserRepo(updatedUser.uid,updatedUser);
    if (success) {
      res.send(200).json({ data: updatedUser });
    } else {
      res.status(500).json({ error: "user not created!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

  try {
    const success = await deleteUserRepo(userId);
    if (success) {
      res.send(200).json({ data:"user deleted" });
    } else {
      res.status(500).json({ error: "user not deleted!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
