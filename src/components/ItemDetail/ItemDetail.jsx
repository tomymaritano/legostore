import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Button,
  Badge,
  Flex,
  IconButton,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const ItemDetail = ({ product }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    images = [product.img], // fallback
    stock,
    shortDescription,
    description,
    category,
    rating,
  } = product;

  const { cart, addItem, isInCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const toast = useToast();

  const inWishlist = isInWishlist(id);
  const inCart = isInCart(id);

  const handleAddToCart = () => {
    if (inCart) {
      toast({
        title: "Producto ya en el carrito.",
        description: `${name} ya estaba en tu carrito.`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      addItem({ id, name, price, images: images[0] }, 1);
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
        image: images[0],
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

  // Galería
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const thumbnailSize = useBreakpointValue({ base: "50px", md: "60px" });

  // Rating stars
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <Flex align="center" gap={1}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} color="#ECC94B" />
        ))}
        {hasHalfStar && <FaStarHalfAlt color="#ECC94B" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} color="#ECC94B" />
        ))}
      </Flex>
    );
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={8}
      align="start"
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
    >
      {/* Galería */}
      <Box flex="1" w="100%">
        <Image
          src={selectedImage}
          alt={name}
          w="100%"
          maxH="400px"
          objectFit="contain"
          mb={4}
          bg="white"
        />

        <Flex gap={2} wrap="wrap">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${name} ${i + 1}`}
              boxSize={thumbnailSize}
              objectFit="contain"
              borderRadius="md"
              border={img === selectedImage ? "2px solid teal" : "1px solid gray.200"}
              cursor="pointer"
              onClick={() => setSelectedImage(img)}
              transition="all 0.2s"
              _hover={{ opacity: 0.8 }}
            />
          ))}
        </Flex>
      </Box>

      {/* Info producto */}
      <Stack spacing={4} flex="1" w="100%">
        <Flex justify="space-between" align="start">
          <Heading as="h2" size="lg">
            {name}
          </Heading>
          <IconButton
            icon={inWishlist ? <FaHeart /> : <FaRegHeart />}
            colorScheme={inWishlist ? "pink" : "gray"}
            variant="ghost"
            size="lg"
            onClick={handleToggleWishlist}
            aria-label="Toggle wishlist"
          />
        </Flex>

        {/* Badges */}
        <Flex gap={2}>
          {product.isNew && (
            <Badge colorScheme="teal" borderRadius="full" px={2} py={1}>
              New
            </Badge>
          )}
          {product.isOnSale && (
            <Badge colorScheme="orange" borderRadius="full" px={2} py={1}>
              Sale
            </Badge>
          )}
          {category && (
            <Badge variant="subtle" colorScheme="gray" borderRadius="full" px={2} py={1}>
              {category.toUpperCase()}
            </Badge>
          )}
        </Flex>

        {/* Rating */}
        {rating && (
          <Flex align="center" gap={2}>
            {renderStars()}
            <Text fontSize="sm" color="gray.500">
              ({rating.toFixed(1)})
            </Text>
          </Flex>
        )}

        {/* Precio */}
        <Flex align="center" gap={3} flexWrap="wrap">
          {product.isOnSale && originalPrice && (
            <Text fontSize="lg" color="gray.500" as="s">
              ${originalPrice}
            </Text>
          )}
          <Text fontSize="2xl" fontWeight="bold" color={product.isOnSale ? "orange.500" : "teal.600"}>
            ${price}
          </Text>
        </Flex>

        {/* Stock */}
        <Text fontSize="sm" color={stock > 0 ? "gray.600" : "red.500"}>
          {stock > 0 ? `Stock disponible: ${stock}` : "Sin stock"}
        </Text>

        {/* Short desc */}
        {shortDescription && (
          <Text fontSize="md" color="gray.700" fontWeight="medium">
            {shortDescription}
          </Text>
        )}

        {/* Descripción */}
        <Text fontSize="sm" color="gray.600" lineHeight="tall">
          {description}
        </Text>

        {/* Botón agregar */}
        <Button
          colorScheme="teal"
          size="lg"
          w="100%"
          onClick={handleAddToCart}
          isDisabled={stock === 0}
        >
          {stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </Button>
      </Stack>
    </Flex>
  );
};

export default ItemDetail;