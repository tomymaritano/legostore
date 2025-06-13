import {
  Badge,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const NavCartButton = ({ total, onClick, badgeClass }) => (
  <Box position="relative" onClick={onClick}>
    <IconButton
      icon={<FaShoppingCart />}
      aria-label="Carrito"
      variant="nav"
      size="md"
    />
    {total > 0 && (
      <Badge
        position="absolute"
        top="0"
        right="0"
        bg="teal.500"
        color="white"
        borderRadius="full"
        fontSize="10px"
        px={1}
        className={badgeClass}
      >
        {total}
      </Badge>
    )}
  </Box>
);

export default NavCartButton;
