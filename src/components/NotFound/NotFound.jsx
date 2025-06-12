import { Box, Heading, Text, Button, Center, Image, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Center minH="80vh" flexDirection="column" textAlign="center" px={6}>
      <Stack spacing={6} align="center">
        <Image
          src="https://www.lego.com/cdn/cs/set/assets/blteaa08f8d22c93281/404-error-page.jpg?fit=crop&quality=80&width=800&height=600&dpr=1"
          alt="LEGO 404"
          maxW="400px"
          borderRadius="md"
        />
        <Heading as="h1" size="2xl">
          404 - Página no encontrada
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="500px">
          ¡Ups! No hemos podido encontrar la página que estás buscando. ¡Pero puedes seguir construyendo tu aventura!
        </Text>
        <Button as={RouterLink} to="/" colorScheme="teal" size="lg">
          Volver al inicio
        </Button>
      </Stack>
    </Center>
  );
};

export default NotFound;