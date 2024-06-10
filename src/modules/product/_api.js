import { Router } from "express";
import { upload } from "../../utils/multer.js";
import { AddNewProduct, DeleteAllProducts, DeleteProductById, GetAllProducts, GetProductById, UpdateProduct } from "./_controller.js";

const productRouter = Router();

productRouter.post("/admin/createProduct", upload.single("img"), AddNewProduct);
productRouter.get("/admin/getAllProducts", GetAllProducts);
productRouter.get("/admin/getProductBy/:id", GetProductById)
productRouter.get("/user/getAllProducts", GetAllProducts);
productRouter.get("/user/getProductBy/:id", GetProductById);
productRouter.delete("/admin/deleteAllProducts", DeleteAllProducts);
productRouter.delete("/admin/deleteProductBy/:id", DeleteProductById);
productRouter.put("/admin/updatedProduct/:id", upload.single("img"), UpdateProduct)

export default productRouter;