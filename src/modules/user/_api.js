import { Router } from "express";
import { GetAdmins, GetUsers } from "./_controller.js";


const userRouter = Router();

userRouter.get("/getAdmins", GetAdmins);
userRouter.get("/getUsers", GetUsers)

export default userRouter;