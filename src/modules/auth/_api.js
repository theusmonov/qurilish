import { Router } from "express";
import validateMiddleware from "../../shared/middleware/index.js";
import { loginUsersSchema, registerUsersSchema } from "./_schema.js";
import { PostLoginAdmin, PostLoginUser, PostRegisterAdmin, PostRegisterUser } from "./_controller.js";

const authRouter = Router();

authRouter.post("/user/auth/signup", validateMiddleware(registerUsersSchema), PostRegisterUser);
authRouter.post("/admin/auth/signup", validateMiddleware(registerUsersSchema), PostRegisterAdmin);
authRouter.post("/admin/auth/signin", validateMiddleware(loginUsersSchema), PostLoginAdmin);
authRouter.post("/user/auth/signin", validateMiddleware(loginUsersSchema), PostLoginUser);

export default authRouter;