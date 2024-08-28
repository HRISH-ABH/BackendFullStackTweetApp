import { Router,Request,Response } from "express";

const helloRouter=Router();

// define route paths

helloRouter.get("/",(req:Request,res:Response)=>{
   res.json({
    "data":"Server is Live"
   })
});


export default helloRouter;