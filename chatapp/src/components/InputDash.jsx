import { Box, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
const InputDash = ({handleLike}) => {
  let [messages, setMessages] = useState([]);
  let [currentMessage, setCurrentMessage] = useState("");
  let [mentionVisible, setMentionVisible] = useState(false);

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
  let handleClick = (mentionVisible, currentMessage) => {
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
      handleLike(messages, setMessages)
      setCurrentMessage("");
    }
  };
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
    <div>
      <Box>
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
            onClick={handleClick}
            bgColor={"white"}
            color={"facebook.400"}
            _hover={{ bgColor: "facebook.400", color: "white" }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default InputDash;
