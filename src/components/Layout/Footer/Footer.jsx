import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Link,
  IconButton,
  Divider,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Image as ChakraImage,
  useToast,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { EmailIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = () => {
    // Aquí puedes integrar tu lógica real (Brevo, Mailchimp, etc)
    toast({
      title: "Suscripción exitosa!",
      description: `Te enviaremos las novedades a: ${email}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEmail("");
  };

  return (
    <Box
      bg={useColorModeValue("blue.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      mt={16}
      pt={12}
      pb={8}
    >
      <Container maxW="1200px">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={10}
        >
          {/* Column 1 */}
          <Stack align="flex-start" minW="150px">
            <Text fontWeight="bold" mb={2} fontSize="lg">
              Productos
            </Text>
            <Link href="/category/helmet">Helmet</Link>
            <Link href="/category/brickheadz">Brickheadz</Link>
            <Link href="/category/cars/sport">Cars</Link>
          </Stack>

          {/* Column 2 */}
          <Stack align="flex-start" minW="150px">
            <Text fontWeight="bold" mb={2} fontSize="lg">
              Compañía
            </Text>
            <Link href="#">Sobre Nosotros</Link>
            <Link href="#">Prensa</Link>
            <Link href="#">Carreras</Link>
          </Stack>

          {/* Column 3 */}
          <Stack align="flex-start" minW="150px">
            <Text fontWeight="bold" mb={2} fontSize="lg">
              Ayuda
            </Text>
            <Link href="#">Centro de ayuda</Link>
            <Link href="#">Política de privacidad</Link>
            <Link href="#">Términos & Condiciones</Link>
          </Stack>

          {/* Column 4 → Newsletter */}
          <Stack align="flex-start" w="100%" maxW="320px">
            <Text fontWeight="bold" mb={2} fontSize="lg">
              Suscribite a nuestro Newsletter
            </Text>
            <Text fontSize="sm" color="gray.500">
              Enterate antes que nadie de lanzamientos y promociones exclusivas.
            </Text>
            <InputGroup size="md" mt={2}>
              <Input
                placeholder="Tu email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="blue"
                  _active={{
                    transform: "scale(0.95)",
                  }}
                  isDisabled={!email.includes("@")}
                  onClick={handleSubscribe}
                >
                  Enviar
                </Button>
              </InputRightElement>
            </InputGroup>

            <Flex gap={3} pt={3}>
              <IconButton
                as="a"
                href="#"
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="ghost"
                size="lg"
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Facebook"
                icon={<FaFacebook />}
                variant="ghost"
                size="lg"
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                size="lg"
              />
              <IconButton
                as="a"
                href="#"
                aria-label="YouTube"
                icon={<FaYoutube />}
                variant="ghost"
                size="lg"
              />
            </Flex>
          </Stack>
        </Flex>

        <Divider my={8} />

        {/* Footer Bottom */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          fontSize="sm"
          color="gray.500"
          gap={4}
        >
          <Text>© {new Date().getFullYear()} LEGO Store. Todos los derechos reservados.</Text>
          <Flex gap={4}>
            <Link href="#">Privacidad</Link>
            <Link href="#">Legal</Link>
            <Link href="#">Cookies</Link>
          </Flex>
          {/* Payment logos */}
          <Flex gap={3}>
            <ChakraImage
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              height="24px"
            />
            <ChakraImage
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              height="24px"
            />
            <ChakraImage
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/640px-American_Express_logo_%282018%29.svg.png"
              alt="Amex"
              height="24px"
            />
            <ChakraImage
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              height="24px"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;