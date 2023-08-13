import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { Picker } from "emoji-mart";
import UserMention from "../components/UserMention";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
// import "emoji-mart/css/emoji-mart.css";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
const ChatPage = () => {
  let [currentMessage, setCurrentMessage] = useState("");
  let [mentionVisible, setMentionVisible] = useState(false);
  let [messages, setMessages] = useState([]);
  let [currentTime, setCurrentTime] = useState("");
  let [user, setUser] = useState("");
  //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  //? GET TIME

  let getCurrentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours > 12 ? "PM" : "AM";
    let formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period} `;
  };

  //? SEND MESSAGE
  let handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      let mentionMessage;
      if (currentMessage.includes("@")) {
        mentionMessage = "@" + currentMessage;
      }
      let currentTime = getCurrentTime();
      let randomUser = Math.floor(Math.random() * user_list.length);
      let newMessage = {
        user: user_list[randomUser],
        text: mentionVisible ? mentionMessage : currentMessage,
        likes: 0,
        time: currentTime,
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    }
  };

  //Onlike
  let handleLike = (index) => {
    let upDatingLikeMessage = [...messages];
    upDatingLikeMessage[index].likes += 1;
    setMessages(upDatingLikeMessage);
  };

  //emoji

  let handleEmojiSelect = (emoji) => {};
  //mention

  let handleMention = (mention) => {
    setCurrentMessage(currentMessage + `${mention}`);
    setMentionVisible(false);
  };

  //keyDown
  useEffect(() => {
    let keyDownHandler = (e) => {
      if (e.key === "@") {
        setMentionVisible(true);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [currentMessage]);

  return (
    <Box minH={"100vh"} bgColor={"gray.200"} p={10} position={"relative"}>
      <h1>Messages</h1>

      <Box display={"flex"} gap={"30"} flexDirection={"column"}>
        {messages.map((message, index) => (
          <Box key={index} display={"flex"} gap={"30"}>
            <ChatMessage
              key={index}
              message={message}
              onLike={() => handleLike(index)}
            />
          </Box>
        ))}
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box h={"80px"} bgColor={"gray.200"} position="fixed" bottom="0">
          <Box display={"flex"} gap={"5"}>
            <Input
              type="text"
              placeholder="Type message"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onFocus={() => setMentionVisible(false)}
              alignItems=""
              borderRadius={"50px"}
              borderColor={"gray.500"}
              _hover={{ borderColor: "gray.600" }}
              borderWidth={"2px"}
              w={"90vw"}
              mb={"6"}
            />
            <Button
              onClick={handleSendMessage}
              bgColor={"white"}
              color={"facebook.400"}
              _hover={{ bgColor: "facebook.400", color: "white" }}
            >
              Send
            </Button>
          </Box>
        </Box>
        {/* {showEmojiPicker && (
          <Picker onSelect={(emoji) => handleEmojiSelect(emoji.native)} />
        )} */}
        {mentionVisible && (
          
          <Box  position="fixed" bottom="20" left={"10"} border="2px solid black" px={10}  py={2}  bgColor={"white"}   borderRadius="20px 20px 0px 20px">
          <UserMention userList={user_list} onMentionClick={handleMention} />
          </Box>
         
        )}
      </div>
    </Box>
  );
};

export default ChatPage;
