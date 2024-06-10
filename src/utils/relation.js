import connectDb from "../db/index.js";
import { Category } from "../models/Category.js";
import { Message } from "../models/Message.js";
import { Product } from "../models/Product.js";
import { Users } from "../models/Users.js";



export const relation = async () => {
  try {
    await connectDb.sync({ alter: true });
   
    Category.hasMany(Product, { foreignKey: 'category_id' });
    Product.belongsTo(Category);

    Product.hasMany(Message, { foreignKey: "product_id" });
    Message.belongsTo(Product, { foreignKey: "product_id" });

    Users.hasMany(Message, { foreignKey: "user_id" });
    Message.belongsTo(Users, { foreignKey: "user_id" });


    await connectDb.sync({ alter: true });
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

export const modelSync = async () => {
  try {
    await connectDb.sync();
    console.log("Modellar bo'glanishi muvaffaqiyatli amalga oshdi!");
  } catch (e) {
    console.error("Modellar bog'lanishda muammo bor!", e.message);
  }
};
