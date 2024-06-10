import { Category } from "../../models/Category.js";
import { Product } from "../../models/Product.js";
import { BadRequestError, NotFoundError } from "../../shared/errors/classes.js";
import pkg from "validator";
const { isUUID } = pkg;

const createProduct = async (data, req) => {
  const { filename } = req.file || {};
  const {
    name,
    price,
    description,
    star,
    features,
    material,
    telephone,
    category_id,
  } = data;

  if (
    !name ||
    !price ||
    !star ||
    !features ||
    !material ||
    !telephone ||
    !description ||
    !category_id
  ) {
    throw new BadRequestError("Missing required fields");
  }

  if (!isUUID(category_id)) {
    throw new BadRequestError("Invalid category id format");
  }

  const findIdCategory = await Category.findByPk(category_id);

  if (!findIdCategory) {
    throw new BadRequestError("Invalid category id provided");
  }

  const product = await Product.create({
    name,
    img: filename ? `${filename}` : "",
    price,
    description,
    star,
    features,
    material,
    telephone,
    category_id,
  });

  return product;
};

const getAllProducts = async () => {
  const data = await Product.findAll();
  if (!data) {
    throw new NotFoundError("All products not found");
  }

  const productsWithImages = data.map((product) => ({
    ...product.toJSON(),
    img: `http://localhost:6987/${product.img}`,
  }));

  return productsWithImages;
};

const getProductById = async (id) => {
  const data = await Product.findByPk(id);
  if (!data) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }

  const productWithImage = {
    ...data.toJSON(),
    img: `http://localhost:6987/${data.img}`,
  };

  return productWithImage;
};

const deleteAllProduct = async (data) => {
  const delProd = await Product.findAll();

  if (!delProd.length) {
    throw new NotFoundError("Deleted products not found");
  }

  await Product.destroy({ where: {}, force: true });
  return {
    message: "All products have been deleted",
    deletedCount: delProd.length,
  };
};

const deleteProductById = async (id) => {
  const productToDelete = await Product.findByPk(id);

  if (!productToDelete) {
    throw new NotFoundError(`Product not found with ID ${id}`);
  }

  await productToDelete.destroy();
  return { message: `Product ID ${id} was successfully deleted` };
};

const updateProductBy = async (id, data, req) => {
  const { filename } = req.file;

  const findProduct = await Product.findByPk(id);

  if (!findProduct) {
    throw new NotFoundError(`Product with ID ${id} not found`);
  }

  await findProduct.update({
    name: data.name,
    img: filename ? `${filename}` : findProduct.img,
    price: data.price,
    description: data.description,
    star: data.star,
    features: data.features,
    material: data.material,
    telephone: data.telephone,
    category_id: data.category_id,
  });

  return { message: `Product with ID ${id} updated successfully` };
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  deleteAllProduct,
  deleteProductById,
  updateProductBy,
};
