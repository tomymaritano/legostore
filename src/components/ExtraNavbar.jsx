import {
  Box,
  Flex,
  Link,
  Button,
  Divider,
  Center,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "./assets/images/legologo.svg";
import CartWidget from "./CartWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@chakra-ui/icons";

library.add(faHeart);

const ExtraNavbar = () => {
  return (
    <Flex
      bg="white"
      color="black"
      py={4}
      px={8}
      justifyContent="space-evenly"
      alignItems={"center"}
    >
      <Flex>
        <Button fontSize={"xs"}>Play Zone</Button>
      </Flex>
      <Flex>
        <Text fontSize={"xs"}>
          A gift with LEGO® purchases of 850 kr. or more{" "}
          <Link color={"blue.600"}>Shop now</Link>
        </Text>
      </Flex>
      <Flex>
          <Text fontSize={"xs"}>Account</Text>
          <Center height="20px">
            <Divider orientation="vertical" m={3} />
          </Center>
          <Text fontSize={"xs"}>VIP</Text>
      </Flex>
    </Flex>
  );
  1;
};

export default ExtraNavbar;
