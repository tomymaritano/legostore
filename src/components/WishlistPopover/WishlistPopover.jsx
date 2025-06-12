import {
  Box,
  IconButton,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  VStack,
  Text,
  Divider,
  HStack,
  Image,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link as RouterLink } from "react-router-dom";

const WishlistPopover = () => {
  const { wishlist, totalWishlistQuantity } = useContext(CartContext);

  return (
    <Popover trigger="hover" placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative" cursor="pointer">
          <IconButton
            aria-label="Favoritos"
            icon={<FontAwesomeIcon icon={faHeart} />}
            variant="ghost"
            size="md"
          />
          {totalWishlistQuantity > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
              px={1.5}
            >
              {totalWishlistQuantity}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent w="320px" zIndex="popover">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Favoritos</PopoverHeader>
        <PopoverBody>
          {totalWishlistQuantity === 0 ? (
            <Text>No tienes productos en favoritos.</Text>
          ) : (
            <VStack align="stretch" spacing={3}>
              {wishlist.slice(0, 3).map((item) => (
                <Box key={item.id}>
                  <HStack spacing={3}>
                    <Image
                      src={item.image || item.img} // soporta ambos nombres
                      alt={item.name}
                      boxSize="50px"
                      objectFit="contain"
                      borderRadius="md"
                      bg="gray.50"
                    />
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                        {item.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        ${item.price}
                      </Text>
                    </Box>
                  </HStack>
                  <Divider mt={2} />
                </Box>
              ))}
              {wishlist.length > 3 && (
                <Text fontSize="sm" color="gray.500">
                  + {wishlist.length - 3} productos más
                </Text>
              )}
            </VStack>
          )}
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="center" alignItems="center">
          <Button
            size="sm"
            colorScheme="teal"
            as={RouterLink}
            to="/wishlist"
          >
            Ver todos los favoritos
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default WishlistPopover;