import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UserMention = ({ userList, onMentionClick }) => {
  return (
    <Box>
      {userList?.map((user, index) => (
        <Text
          _hover={{ color: "facebook.400", fontWeight: "bolder" }}
          py={"2"}
          fontSize={"md"}
          cursor={"pointer"}
          key={index}
          onClick={() => onMentionClick(user)}
        >
          {user}
        </Text>
      ))}
    </Box>
  );
};

export default UserMention;
