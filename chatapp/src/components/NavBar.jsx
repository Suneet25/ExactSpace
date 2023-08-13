import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../assets/exactspace-white.png";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  let { theme, toggleTheme } = useTheme();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"2px solid gray"}
      pb={"5"}
      pt={"5"}
    >
      <Image src={Logo} bgColor={"black"} w={"100px"} />
      <Text
        as={"b"}
        fontSize={"md"}
        color={theme === "light" ? "" : "white"}
        display={{ base: "none", sm: "none", md: "block", lg: "block" }}
      >
        This chat is for company wide chatter
      </Text>
      <Icon
        as={theme === "light" ? BsFillMoonFill : BsSunFill}
        boxSize={"5"}
        onClick={() => toggleTheme()}
        color={theme === "light" ? "" : "white"}
      />
    </Flex>
  );
};

export default NavBar;
