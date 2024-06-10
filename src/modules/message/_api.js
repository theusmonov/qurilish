import { Router } from "express";
import { CreateMessage } from "./_controller.js";


const messageRouter = Router();

messageRouter.post("/user/addMessage", CreateMessage);

export default messageRouter;