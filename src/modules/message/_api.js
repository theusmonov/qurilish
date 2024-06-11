import { Router } from "express";
import { CreateMessage, DeleteAllMessage, DeleteAllMessageById, GetMessage } from "./_controller.js";


const messageRouter = Router();

messageRouter.post("/user/addMessage", CreateMessage);
messageRouter.get("/admin/getUserMessage", GetMessage);
messageRouter.delete("/admin/deleteAllMessage", DeleteAllMessage);
messageRouter.delete("/admin/deleteMessageBy/:id", DeleteAllMessageById);

export default messageRouter;