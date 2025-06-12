import { Box, Image, Text, Stack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

const ProductCard = ({ id, name, price, image }) => {
  return (
    <Link to={`/item/${id}`}>
      <MotionBox
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="sm"
        _hover={{ boxShadow: "lg" }}
        bg="white"
      >
        <Box overflow="hidden">
          <MotionBox
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={image}
              alt={name}
              w="100%"
              h="200px"
              objectFit="cover"
            />
          </MotionBox>
        </Box>
        <Stack p={4} spacing={2}>
          <Heading as="h3" size="md" noOfLines={1}>
            {name}
          </Heading>
          <Text fontSize="lg" fontWeight="bold" color="teal.600">
            ${price}
          </Text>
        </Stack>
      </MotionBox>
    </Link>
  );
};

export default ProductCard;