import { Message } from "../../models/Message.js";
import { Product } from "../../models/Product.js";
import { Users } from "../../models/users.js";
import { BadRequestError, NotFoundError } from "../../shared/errors/classes.js";
import pkg from "validator";
const { isUUID } = pkg;

const createMessage = async (data) => {
  const { customer_name, customer_phone, message, product_id, user_id } = data;

  if (
    !customer_name ||
    !customer_phone ||
    !message ||
    !product_id ||
    !user_id
  ) {
    throw new BadRequestError("Missing required fields");
  }

  if (!isUUID(product_id) || !isUUID(user_id)) {
    throw new BadRequestError("Invalid product id or user id format");
  }

  const findProduct = await Product.findByPk(product_id);

  if (!findProduct) {
    throw new BadRequestError("Invalid product id provided");
  }

  const findUser = await Users.findByPk(user_id);
  if (!findUser) {
    throw new BadRequestError("User not found. Please register to leave a message.");
  }

  const order = await Message.create({
    customer_name,
    customer_phone,
    message,
    product_id,
    user_id,
  });

  return order;
};



const getMessage = async () => {

    const data = await Message.findAll();
    if(!data){
      throw new NotFoundError("Messages not found")
    }

    return data;
};



const deleteMessage = async () => {

  const data = await Message.findAll({});

  if(data.length === 0) {
     throw new NotFoundError("No messages found to delete")
  }

  await Message.destroy({
    where: {},
    truncate: true
  });

  return { message: "All messages deleted successfully" };
}


const deleteMessagebyid = async (id) => {

  const data = await Message.findByPk(id);


  if (!data) {
    throw new NotFoundError(`Message with ID ${id} not found`);
  }

  await Message.destroy({
    where: { id }
  });

  return { message: `Message with ID ${id} deleted successfully` };
};



export { createMessage , getMessage, deleteMessage, deleteMessagebyid};
