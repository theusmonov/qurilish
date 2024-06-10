import { Router } from "express";
import { upload } from "../../utils/multer.js";
import { AddCategory, DeleteAllCategory, DeleteCategoryById, GetAllCategory, GetCategoryById, UpdateCategory} from "./_controller.js";


const categoryRouter = Router();

categoryRouter.post("/admin/createCategory", upload.single("categoryImage"), AddCategory)
categoryRouter.get("/admin/getAllCategory", GetAllCategory);
categoryRouter.get("/admin/getCategoryBy/:id", GetCategoryById);
categoryRouter.get("/user/getAllCategory", GetAllCategory);
categoryRouter.get("/user/getCategoryBy/:id", GetCategoryById);
categoryRouter.put("/admin/updateCategory/:id", upload.single("categoryImage"), UpdateCategory);
categoryRouter.delete("/admin/deleteAllCategory", DeleteAllCategory);
categoryRouter.delete("/admin/deleteCategoryBy/:id", DeleteCategoryById);

export default categoryRouter;