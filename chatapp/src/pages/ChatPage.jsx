import React, { useEffect, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import Picker from "emoji-picker-react";
import UserMention from "../components/UserMention";
import { Box, Button, Icon, Input } from "@chakra-ui/react";
import { BsEmojiSmile } from "react-icons/bs";
import NavBar from "../components/NavBar";
import { useTheme } from "../context/ThemeContext";

//User List Provided
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatPage = () => {
  let [currentMessage, setCurrentMessage] = useState("");
  let [mentionVisible, setMentionVisible] = useState(false);
  let [showEmoji, setShowEmoji] = useState(false);
  let [messages, setMessages] = useState([]);
  let { theme } = useTheme();

  //Emoji show on click
  let handleEmojiClick = (event) => {
    setCurrentMessage((prev) => prev + event.emoji);
    setShowEmoji(false);
  };

  //Get Current time
  let getCurrentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours > 12 ? "PM" : "AM";
    let formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period} `;
  };

  //Send message on clicking button
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

  //Onliking the thread
  let handleLike = (index) => {
    let upDatingLikeMessage = [...messages];
    upDatingLikeMessage[index].likes += 1;
    setMessages(upDatingLikeMessage);
  };

  //mention
  let handleMention = (mention) => {
    setCurrentMessage(currentMessage + `${mention}`);
    setMentionVisible(false);
  };

  //keyDownHandler To Track @ button for mentioning
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
    <Box
      minH={"100vh"}
      bgColor={theme === "light" ? "gray.200" : "rgb(5,12,27)"}
      p={"0px 30px 30px 30px"}
      position={"relative"}
    >
      {/* NavBar */}
      <Box
        position={"sticky"}
        zIndex={"4"}
        top={"0"}
        bgColor={theme === "light" ? "gray.200" : "rgb(5,12,27)"}
      >
        <NavBar />
      </Box>

      <Box display={"flex"} gap={"30"} flexDirection={"column"} mt={10}>
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
        {/* InputAndButton */}
        <Box
          h={"80px"}
          bgColor={theme === "light" ? "gray.200" : "rgb(5,12,27)"}
          position="fixed"
          bottom="0"
        >
          <Box display={"flex"} gap={"5"}>
            <Input
              type="text"
              placeholder="Type message"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onFocus={() => setMentionVisible(false)}
              alignItems=""
              borderRadius={"50px"}
              borderColor={theme === "light" ? "gray.500" : "white"}
              _hover={{ borderColor: "gray.600" }}
              borderWidth={"2px"}
              w={{ base: "60vw", sm: "60vw", md: "80vw", lg: "90vw" }}
              mb={"6"}
              position={"relative"}
              textColor={theme === "light" ? "" : "white"}
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
        <Icon
          as={BsEmojiSmile}
          boxSize={6}
          color={theme === "light" ? "black" : "white"}
          onClick={() => setShowEmoji(!showEmoji)}
          cursor="pointer"
          position="fixed"
          bottom="12"
          right={"130px"}
          _hover={{ color: "red" }}
        ></Icon>

        {/* Mention */}

        {mentionVisible && (
          <Box
            position="fixed"
            bottom="20"
            left={"10"}
            border="2px solid black"
            px={10}
            py={2}
            bgColor={"white"}
            borderRadius="20px 20px 0px 20px"
          >
            <UserMention userList={user_list} onMentionClick={handleMention} />
          </Box>
        )}
        {/* ShowEmoji */}
        {showEmoji && (
          <Picker
            theme={theme === "light" ? "light" : "dark"}
            onEmojiClick={handleEmojiClick}
          />
        )}
      </div>
    </Box>
  );
};

export default ChatPage;
