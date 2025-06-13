import { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const NavSearchPopover = ({ products, onSearch }) => {
  const [query, setQuery] = useState("");
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  const handleResultClick = () => {
    setTimeout(() => setQuery(""), 100);
  };

  return (
    <Popover isOpen={query.length >= 2} placement="bottom-start">
      <PopoverTrigger>
        <Box as="form" onSubmit={handleSubmit}>
          <InputGroup size="sm" w="200px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              placeholder="Buscar productos..."
              borderRadius="full"
              bg="gray.100"
              _hover={{ bg: "gray.200" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Box>
      </PopoverTrigger>
      <PopoverContent w="250px" maxH="300px" overflowY="auto" zIndex="popover">
        <PopoverArrow />
        <PopoverCloseButton onClick={() => setQuery("")} />
        <PopoverBody>
          {filtered.length === 0 ? (
            <Text textAlign="center" py={2} color="gray.500">
              No se encontraron productos.
            </Text>
          ) : (
            filtered.slice(0, 5).map((prod) => (
              <Box
                key={prod.id}
                as={NavLink}
                to={`/item/${prod.id}`}
                display="flex"
                alignItems="center"
                gap={3}
                py={2}
                px={2}
                borderRadius="md"
                _hover={{ bg: "gray.100" }}
                onClick={handleResultClick}
              >
                <Image
                  src={prod.img}
                  boxSize="40px"
                  objectFit="contain"
                  borderRadius="md"
                  bg="white"
                />
                <Box>
                  <Text fontWeight="medium" noOfLines={1}>
                    {prod.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    ${prod.price}
                  </Text>
                </Box>
              </Box>
            ))
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NavSearchPopover;
