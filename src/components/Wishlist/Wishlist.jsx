import {
  Container,
  Heading,
  VStack,
  Box,
  Image,
  Text,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import useWishlist from "../../hooks/useWishlist";
import { Link as RouterLink } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Tus Favoritos ❤️
      </Heading>

      {wishlist.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          No tienes productos en favoritos.
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {wishlist.map((item) => {
            const productImage =
              item.image || item.img || (item.images?.[0]) || "https://via.placeholder.com/64";

            return (
              <HStack
                key={item.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="sm"
                spacing={4}
                alignItems="center"
                _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                transition="all 0.2s ease"
              >
                <Image
                  src={productImage}
                  alt={item.name}
                  boxSize="64px"
                  objectFit="contain"
                  borderRadius="md"
                  bg="gray.50"
                />
                <Box flex="1" minW="0">
                  <Text fontWeight="bold" noOfLines={1}>
                    {item.name}
                  </Text>
                  <Text color="teal.600" fontSize="sm" mt={1}>
                    ${item.price?.toLocaleString("es-AR")}
                  </Text>
                </Box>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FaHeartBroken />}
                    aria-label="Eliminar de favoritos"
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeFromWishlist(item.id)}
                    _hover={{ bg: "red.50" }}
                  />
                  <Button
                    size="sm"
                    as={RouterLink}
                    to={`/item/${item.id}`}
                    colorScheme="teal"
                    variant="solid"
                    _hover={{ transform: "translateY(-1px)" }}
                  >
                    Ver detalle
                  </Button>
                </HStack>
              </HStack>
            );
          })}
        </VStack>
      )}
    </Container>
  );
};

export default Wishlist;