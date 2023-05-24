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
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon, ArrowBackIcon } from "@chakra-ui/icons";

library.add(faHeart);

const ExtraNavbar = () => {
  return (
    <Flex
      bg="white"
      color="black"
      py={3}
      px={8}
      justifyContent="space-evenly"
      alignItems={"center"}
    >
      <Flex>
        <Button leftIcon={<ArrowBackIcon />} size={'xs'} bgColor={'blue.100'} fontSize={"xs"}>Play Zone</Button>
      </Flex>
      <Flex>
        <Text fontSize={"xs"}>
          A gift with LEGO® purchases of 850 kr. or more{" "}
          <Link color={"blue.600"}>Shop now</Link>
        </Text>
      </Flex>
      <Flex>
          <Button size={'xs'} fontSize={"xs"} bgColor={'transparent'}>Account</Button>
          <Center height="20px">
            <Divider orientation="vertical" m={3} />
          </Center>
          <Button size={'xs'} fontSize={"xs"} bgColor={'transparent'}>VIP</Button>
      </Flex>
    </Flex>
  );
  1;
};

export default ExtraNavbar;
