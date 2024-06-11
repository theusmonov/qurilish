import { createMessage, deleteMessage, deleteMessagebyid, getMessage } from "./messageService.js";



const CreateMessage = async (req, res, next) => {
  try {
    const messageData = await createMessage(req.body);
    return res.status(201).json({message: "Messaga added successfuly", msg: messageData});
  } catch (err) {
    next(err);
  }
};

const GetMessage = async (req, res, next) => {
  try {
    const data = await getMessage();
    return res.status(200).json({message: "All messages", msg: data});
  } catch (err) {
    next(err)
  }
};


const DeleteAllMessage = async (req, res, next) => {
  try {
    const data = await deleteMessage();
    return res.status(200).json({message: "All messages deleted", msg: data});
  } catch (err) {
    next(err)
  }
}


const DeleteAllMessageById = async (req, res, next) => {
  try {
    const data = await deleteMessagebyid(req.params.id);
    return res.status(200).json({message: "Deleted with id message", msg: data});
  } catch (err) {
    next(err)
  }
}

export {CreateMessage, GetMessage, DeleteAllMessage, DeleteAllMessageById}
