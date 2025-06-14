import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Button,
  useToast,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCardBadge from "../ProductCardBadge/ProductCardBadge";
import ProductCardPrice from "../ProductCardPrice/ProductCardPrice";

const MotionBox = motion(Box);

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  img,
  image,
  imageSecondary,
  images = [],
  stock,
  category,
  description,
  isNew,
  isOnSale,
}) => {
  const { cart, addItem, isInCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const toast = useToast();
  const location = useLocation();

  const inWishlist = isInWishlist(id);
const [activeImage, setActiveImage] = useState(
  images?.[0] || image || img
);

  const handleAddToCart = () => {
    if (isInCart(id)) {
      toast({
        title: "Producto ya en el carrito.",
        description: `${name} ya estaba en tu carrito.`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      addItem({ id, name, price, image: activeImage }, 1);


      toast({
        title: "Producto agregado.",
        description: `${name} se agregó al carrito.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
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
      minHeight="550px"
      maxW={'400px'}
    >
      {/* Imagen + Wishlist */}
      <Box position="relative" w="100%" h="320px">
        <Box
          as={RouterLink}
          to={`/item/${id}`}
          state={{ backgroundLocation: location }}
        >
          <Image
            src={activeImage}
            alt={name}
            w="100%"
            h="100%"
            objectFit="contain"
            bg="white"
            transition="opacity 0.3s ease"
            _groupHover={{
              opacity: imageSecondary || images?.[1] ? 0.8 : 1,
            }}
            onMouseEnter={() => {
              if (imageSecondary) {
                setActiveImage(imageSecondary);
              } else if (images?.[1]) {
                setActiveImage(images[1]);
              }
            }}
            onMouseLeave={() => {
              setActiveImage(images?.[0] || image);
            }}
          />
        </Box>

        <ProductCardBadge isNew={isNew} isOnSale={isOnSale} />

        <IconButton
          icon={inWishlist ? <FaHeart /> : <FaRegHeart />}
          colorScheme={inWishlist ? "pink" : "gray"}
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

      {/* Thumbnails */}
      {images?.length > 1 && (
        <Flex px={4} pt={2} pb={1} gap={2} justify="center">
          {images.map((imgSrc, idx) => (
            <Box
              key={idx}
              as="button"
              borderRadius="md"
              border={activeImage === imgSrc ? "2px solid #319795" : "1px solid #e2e8f0"}
              p="2px"
              transition="all 0.2s ease"
              _hover={{
                borderColor: "#319795",
              }}
              onClick={() => setActiveImage(imgSrc)}
            >
              <Image
                src={imgSrc}
                boxSize="40px"
                objectFit="cover"
                borderRadius="md"
              />
            </Box>
          ))}
        </Flex>
      )}

      {/* Contenido */}
      <Stack p={4} spacing={3} flexGrow={1}>
        <Heading as="h3" size="md" noOfLines={2}>
          {name}
        </Heading>

        <ProductCardPrice
          price={price}
          originalPrice={originalPrice}
          isOnSale={isOnSale}
        />

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
          colorScheme="blue"
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