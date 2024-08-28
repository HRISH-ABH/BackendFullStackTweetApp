import {Router } from "express";
import { createTweetController, deleteTweetController, getTweetController, updateTweetController } from "../controllers/tweet.controller";
const tweetRouter=Router();

// define route poaths
tweetRouter.get("/:tweetId",getTweetController);
tweetRouter.get("/",getTweetController);
tweetRouter.post("/",createTweetController);
tweetRouter.delete("/:tweetId",deleteTweetController);
tweetRouter.put("/",updateTweetController);

export default tweetRouter;