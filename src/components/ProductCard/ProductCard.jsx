import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Badge,
  Button,
  useToast,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MotionBox = motion(Box);

const ProductCard = ({
  id,
  name,
  price,
  image,
  stock,
  category,
  description,
  isNew,
  isOnSale,
}) => {
  const { cart, addItem, wishlist, addToWishlist, removeFromWishlist } = useContext(CartContext);

  const toast = useToast();
  const location = useLocation();

  const isInWishlist = wishlist.some((prod) => prod.id === id);

  const handleAddToCart = () => {
    const isInCart = cart.some((prod) => prod.id === id);

    if (isInCart) {
      toast({
        title: "Producto ya en el carrito.",
        description: `${name} ya estaba en tu carrito.`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      addItem({ id, name, price }, 1);

      toast({
        title: "Producto agregado.",
        description: `${name} se agregó al carrito.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
      toast({
        title: "Removido de favoritos.",
        description: `${name} se removió de favoritos.`,
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      addToWishlist({
        id,
        name,
        price,
        image,
        stock,
        description,
        category,
      });

      toast({
        title: "Agregado a favoritos.",
        description: `${name} se agregó a favoritos.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      role="group"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="550px" // Altura mínima fija para consistencia
    >
      {/* Imagen + Wishlist */}
      <Box position="relative" w="100%" h="320px">
        <Box as={RouterLink} to={`/item/${id}`} state={{ backgroundLocation: location }}>
          <Image
            src={image}
            alt={name}
            w="100%"
            h="100%"
            objectFit="contain"
            bg="white"
          />
        </Box>

        {/* Badges */}
        {isNew && (
          <Badge
            position="absolute"
            top={2}
            left={2}
            colorScheme="teal"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            textTransform="uppercase"
            zIndex="overlay"
          >
            New
          </Badge>
        )}
        {isOnSale && (
          <Badge
            position="absolute"
            top={2}
            left={isNew ? "60px" : "2px"}
            colorScheme="orange"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            textTransform="uppercase"
            zIndex="overlay"
          >
            Sale
          </Badge>
        )}

        {/* Wishlist Icon */}
        <IconButton
          icon={isInWishlist ? <FaHeart /> : <FaRegHeart />}
          colorScheme={isInWishlist ? "pink" : "gray"}
          variant="ghost"
          size="sm"
          position="absolute"
          top="2"
          right="2"
          onClick={handleToggleWishlist}
          zIndex="overlay"
          aria-label="Toggle wishlist"
        />
      </Box>

      {/* Contenido */}
      <Stack p={4} spacing={3} flexGrow={1}>
        <Heading as="h3" size="md" noOfLines={2}>
          {name}
        </Heading>

        <Text fontSize="lg" fontWeight="bold" color="teal.600">
          ${price}
        </Text>

        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {description}
        </Text>

        <Text fontSize="sm" color={stock > 0 ? "gray.500" : "red.500"} mt={1}>
          {stock > 0 ? `Stock disponible: ${stock}` : "Sin stock"}
        </Text>
      </Stack>

      {/* Botones */}
      <Stack p={4} spacing={2}>
        <Button
          colorScheme="teal"
          size="md"
          w="100%"
          onClick={handleAddToCart}
          isDisabled={stock === 0}
        >
          Agregar al carrito
        </Button>

        <Button
          as={RouterLink}
          to={`/item/${id}`}
          state={{ backgroundLocation: location }}
          variant="outline"
          colorScheme="gray"
          size="md"
          w="100%"
        >
          Ver detalle
        </Button>
      </Stack>
    </MotionBox>
  );
};

export default ProductCard;