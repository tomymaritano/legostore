import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Container
} from "@chakra-ui/react";
import CartWidget from "./CartWidget";
import ItemListContainer from "./ItemListContainer";

const NavBar = () => {
  return (
    <Container>
      <Flex as="nav" alignItems="center" justifyContent="space-between">
        <Box fontSize="lg" fontWeight="bold">
          Ecommerce
        </Box>
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
        <ItemListContainer greeting="Welcome" />
      </Flex>
    </Container>

  );
};

export default NavBar;
