import { Container, SimpleGrid } from "@chakra-ui/react";
import Item from "../Item/Item";
import { motion } from "framer-motion";

const MotionSimpleGrid = motion(SimpleGrid);

// Variants para el grid → stagger
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // delay entre cada product
      delayChildren: 0.2,   // espera antes de empezar
    },
  },
};

// Variants para cada product card
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ItemList = ({ products }) => {
  return (
    <Container maxW="100%" py={6} px={{ base: 4, md: 8 }}>
      <MotionSimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={6}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {products.map((prod) => (
          <motion.div key={prod.id} variants={itemVariants}>
            <Item {...prod} />
          </motion.div>
        ))}
      </MotionSimpleGrid>
    </Container>
  );
};

export default ItemList;