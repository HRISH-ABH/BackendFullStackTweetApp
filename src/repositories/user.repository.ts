import mongoose from "mongoose";
import UserModel from "../database/models/user.model";
import { IUserInterface } from "../database/interfaces/user.interface";

export const getUserRepo = async (
  userId: string
): Promise<IUserInterface | null> => {
  try {
    const user = await UserModel.findOne({
      uid: userId,
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteUserRepo = async (userId: string): Promise<boolean> => {
  try {
    const userDeleted = await UserModel.findOneAndDelete({
      uid: userId,
    });
    if (userDeleted) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const createUserRepo = async (
  user: IUserInterface
): Promise<boolean> => {
  try {
    await UserModel.create(user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const updateUserRepo = async (
  userId: string,
  updatedUser: IUserInterface
): Promise<boolean> => {
  try {
    const result=await UserModel.findOneAndUpdate({ uid: userId }, updatedUser, {
      new: true,
    });
    if(result){
        return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateUserWithTweetIDRepo=async(

  userId:string,
  tweetId:string
):Promise<boolean>=>{
  try {
    const result =await UserModel.findOneAndUpdate(
      {uid:userId},
      {$push:{tweet:tweetId}}
    )
    if(result){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
    
  }
}
export const deleteUserWithTweetIDRepo=async(

  userId:string,
  tweetId:string
):Promise<boolean>=>{
  try {
    const result =await UserModel.findOneAndUpdate(
      {uid:userId},
      {$pull:{tweet:tweetId}}
    )
    if(result){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
    
  }
}