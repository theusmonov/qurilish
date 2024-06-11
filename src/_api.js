import { Router } from "express";
import authRouter from "./modules/auth/_api.js";
import categoryRouter from "./modules/category/_api.js";
import productRouter from "./modules/product/_api.js";
import messageRouter from "./modules/message/_api.js";
import userRouter from "./modules/user/_api.js";


const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(categoryRouter);
mainRouter.use(productRouter);
mainRouter.use(messageRouter);
mainRouter.use(userRouter);

export default mainRouter;