import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <Box as="nav" bg="rgb(255, 207, 1)" p='4'>
      <Flex alignItems="center" justifyContent="space-between">
        <Menu>
          <MenuButton as={Button} mr={6}>
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem>Home</MenuItem>
            <MenuItem>Shop</MenuItem>
            <MenuItem>Contact</MenuItem>
          </MenuList>
        </Menu>
        <CartWidget />
      </Flex>
    </Box>
  );
};

export default NavBar;
