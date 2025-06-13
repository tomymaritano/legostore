import {
  Badge,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const NavWishlistButton = ({ total, onClick }) => (
  <Box position="relative" cursor="pointer" onClick={onClick}>
    <IconButton
      icon={<FaHeart />}
      aria-label="Favoritos"
      variant="nav"
      size="md"
    />
    {total > 0 && (
      <Badge
        position="absolute"
        top="0"
        right="0"
        bg="pink.500"
        color="white"
        borderRadius="full"
        fontSize="10px"
        px={1}
      >
        {total}
      </Badge>
    )}
  </Box>
);

export default NavWishlistButton;
