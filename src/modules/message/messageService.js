import { Message } from "../../models/Message.js";
import { Product } from "../../models/Product.js";
import { BadRequestError } from "../../shared/errors/classes.js";
import pkg from "validator";
const { isUUID } = pkg;




const createMessage = async (data) => {
    const { customer_name, customer_phone, message, product_id , user_id} = data;
  
    if (!customer_name || !customer_phone || !message || !product_id, user_id) {
      throw new BadRequestError("Missing required fields");
    }
  
    if (!isUUID(product_id)) {
      throw new BadRequestError("Invalid product id format");
    }
  
    const findProduct = await Product.findByPk(product_id);
  
    if (!findProduct) {
      throw new BadRequestError("Invalid product id provided");
    }
  
    const order = await Message.create({
      customer_name,
      customer_phone,
      message,
      product_id,
      user_id
    });
  
    return order;
  };
  
  export { createMessage };