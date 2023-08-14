let express = require("express");
const {
  AddChatContoller,
  GetChatController,
  EditChatController,
  DeleteChatController,
} = require("../controllers/ChatContoller");

let ChatRouter = express.Router();

ChatRouter.post("/add-chat", AddChatContoller) //addChat
  .get("/get-chat", GetChatController) //getChat
  .put("/update-chat/:id", EditChatController) //editChat
  .delete("/delete-chat/:id", DeleteChatController); //deleteChat
module.exports = ChatRouter;
