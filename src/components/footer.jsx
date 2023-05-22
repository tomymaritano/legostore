import { Box, Flex, Link } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box color={"white"} bg="#201d48" py={6}>
      <Flex justify="center" alignItems="center">
        <Link mx={2} href="#">
          <FaFacebook size={20} />
        </Link>
        <Link mx={2} href="#">
          <FaTwitter size={20} />
        </Link>
        <Link mx={2} href="#">
          <FaInstagram size={20} />
        </Link>
      </Flex>
      <Flex justify="center" mt={4}>
        <Link mx={2} href="#">
          About
        </Link>
        <Link mx={2} href="#">
          Terms of Service
        </Link>
        <Link mx={2} href="#">
          Privacy Policy
        </Link>
        <Link mx={2} href="#">
          Contact
        </Link>
      </Flex>
      <Flex justify="center" mt={4}>
        <span>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</span>
      </Flex>
    </Box>
  );
};

export default Footer;
