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
            aria-label="Ver favoritos"
            icon={<FontAwesomeIcon icon={faHeart} />}
            variant="ghost"
            size="md"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
          />
          {totalWishlistQuantity > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="0"
              right="0"
              fontSize="0.7em"
              px={1}
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
            <Text textAlign="center" color="gray.500">
              No tienes productos en favoritos.
            </Text>
          ) : (
            <VStack align="stretch" spacing={3}>
              {wishlist.slice(0, 3).map((item, index) => {
                const productImage =
                  item.image || item.img || item.images?.[0] || "https://via.placeholder.com/50";

                return (
                  <Box key={item.id}>
                    <HStack spacing={3}>
                      <Image
                        src={productImage}
                        alt={item.name}
                        boxSize="50px"
                        objectFit="contain"
                        borderRadius="md"
                        bg="gray.50"
                      />
                      <Box flex="1" minW="0">
                        <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          ${item.price?.toLocaleString("es-AR")}
                        </Text>
                      </Box>
                    </HStack>
                    {index !== Math.min(2, wishlist.length - 1) && <Divider mt={2} />}
                  </Box>
                );
              })}
              {wishlist.length > 3 && (
                <Text fontSize="sm" color="gray.500" textAlign="center" mt={1}>
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
            _hover={{ transform: "translateY(-1px)" }}
          >
            Ver todos los favoritos
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default WishlistPopover;