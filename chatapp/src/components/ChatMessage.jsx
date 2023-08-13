import { Avatar, Badge, Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

const ChatMessage = ({ message, onLike }) => {
  let { theme } = useTheme();
  return (
    <Flex direction={"column"} gap={2}>
      <Flex gap="3" alignItems={"center"}>
        <Avatar fontSize={"50px"} name={message.user} src={message.user} />
        <Text
          as={"b"}
          fontSize={"md"}
          color={theme === "light" ? "gray.700" : "white"}
        >
          {message.user}
        </Text>
        <Text
          fontSize={"12px"}
          mt={1}
          color={theme === "light" ? "gray.700" : "white"}
        >
          {message.time}
        </Text>
      </Flex>
      <Flex gap="3" alignItems={"center"} flexWrap={"wrap"}>
        <Box
          px={"40px"}
          py={"10px"}
          borderRadius="0 20px 20px 20px"
          bgColor={"white"}
          ml={"50px"}
        
        >
          {message.text}
        </Box>
        <Flex gap={2} alignItems={"center"} position={"relative"}>
          {message.likes <= 0 ? (
            <Icon
              as={AiOutlineHeart}
              boxSize={6}
              onClick={onLike}
              cursor="pointer"
              color={theme === "light" ? "" : "white"}
            />
          ) : (
            <Icon
              as={AiTwotoneHeart}
              boxSize={6}
              color={"red"}
              onClick={onLike}
              position={"relative"}
              cursor="pointer"
            ></Icon>
          )}
          {message.likes <= 0 ? null : (
            <Badge
              ml="5"
              mb={"5"}
              position={"absolute"}
              color="black"
              bgColor="white"
            >
              {message.likes}
            </Badge>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatMessage;
