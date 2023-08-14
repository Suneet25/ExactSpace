let { ChatModel } = require("../models/ChatModel");

//AddChatController
let AddChatContoller = async (req, res) => {
  try {
    let chat = await new ChatModel(req.body).save();
    res.status(201).send({ success: true, message: "chat saved", chat });
  } catch (error) {
    console.log(error);
  }
};

//GetChatController
let GetChatController = async (req, res) => {
  try {
    let chats = await ChatModel.find({});
    res.status(201).send({ success: true, message: "chat recieved", chats });
  } catch (error) {
    console.log(error);
  }
};

//EditChatController
let EditChatController = async (req, res) => {
  try {
    let chat = await ChatModel.findOne({ _id: req.params.id });

    // Create an object with updated properties
    let updating = { ...chat.toObject(), likes: chat.likes + 1 };

    // Update the chat document using findByIdAndUpdate
    let updatedChat = await ChatModel.findByIdAndUpdate(
      req.params.id,
      updating,
      { new: true }
    );

    res
      .status(201)
      .send({ success: true, message: "chat updated", updatedChat });
  } catch (error) {
    console.log(error);
  }
};

//DeleteChatController
let DeleteChatController = async (req, res) => {
    try {
      let chat = await ChatModel.findOne({ _id: req.params.id });
  
      // Create an object with updated properties
     
  
      // Update the chat document using findByIdAndUpdate
      let deletedChat = await ChatModel.findByIdAndDelete(
        req.params.id

      );
  
      res
        .status(201)
        .send({ success: true, message: "chat deleted", deletedChat });
    } catch (error) {
      console.log(error);
    }
  };
  

module.exports = { AddChatContoller, GetChatController, EditChatController,DeleteChatController };
