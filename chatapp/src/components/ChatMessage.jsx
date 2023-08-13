import { Avatar, Badge, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

const ChatMessage = ({ message, onLike }) => {
  return (
    <Flex direction={"column"} gap={2}>
      <Flex gap="3" alignItems={"center"}>
        <Avatar fontSize={"50px"} name={message.user} src={message.user} />
        <Text as={"b"} fontSize={"md"} color={"gray.700"}>
          {message.user}
        </Text>
        <Text color={"gray.700"} fontSize={"12px"} mt={1}>
          {message.time}
        </Text>
      </Flex>
      <Flex gap="3" alignItems={"center"}>
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
