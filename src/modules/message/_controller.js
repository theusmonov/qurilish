import { createMessage } from "./messageService.js";



const CreateMessage = async (req, res, next) => {
  try {
    const messageData = await createMessage(req.body);
    return res.status(201).json({message: "Messaga added successfuly", msg: messageData});
  } catch (err) {
    next(err);
  }
};


export {CreateMessage}
