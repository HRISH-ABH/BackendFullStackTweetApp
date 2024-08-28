import { Request, Response } from "express";
import {
  getTweetRepo,
  updateTweetRepo,
  deleteTweetRepo,
  createTweetRepo,
} from "../repositories/tweet.repository";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { deleteUserWithTweetIDRepo, updateUserWithTweetIDRepo } from "../repositories/user.repository";

export const getTweetController = async (req: Request, res: Response) => {
  const tweetId = req.query.tweetId as string;

  try {
    const tweet = await getTweetRepo(tweetId);
    if (tweet) {
      res.send(200).json({ data: tweet });
    } else {
      res.status(500).json({ error: "tweet not Found!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const createTweetController = async (req: Request, res: Response) => {
  const tweet: ITweetInterface = req.body;

  try {
    const success = await createTweetRepo(tweet);
    if (success) {
      const userUpdateSuccess=await updateUserWithTweetIDRepo(tweet.adminId,tweet.tweetId);
      if(userUpdateSuccess){

        res.send(200).json({ data: tweet });
      }
    } else {
      res.status(500).json({ error: "tweet not created!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const updateTweetController = async (req: Request, res: Response) => {
  const updatedTweet: ITweetInterface = req.body;

  try {
    const success = await updateTweetRepo(updatedTweet.tweetId,updatedTweet);
    if (success) {
      res.send(200).json({ data: updatedTweet });
    } else {
      res.status(500).json({ error: "tweet not created!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const deleteTweetController = async (req: Request, res: Response) => {
    const tweetId = req.query.tweetId as string;
    const adminId=req.query.adminId as string;

  try {
    const success = await deleteTweetRepo(tweetId);
    const deleteUpdateSuccess=await deleteUserWithTweetIDRepo(adminId,tweetId);
    if (success) {
      res.send(200).json({ data:"tweet deleted" });
    } else {
      res.status(500).json({ error: "tweet not deleted!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
