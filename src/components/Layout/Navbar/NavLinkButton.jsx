import { Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavLinkButton = ({ to, label, onClick }) => (
  <Link
    as={NavLink}
    to={to}
    onClick={onClick}
    position="relative"
    fontWeight="600"
    fontSize="sm"
    textTransform="uppercase"
    _after={{
      content: "''",
      position: "absolute",
      bottom: "-2px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "0",
      height: "2px",
      bg: "black",
      transition: "width 0.3s ease",
    }}
    _hover={{ _after: { width: "100%" } }}
  >
    {label}
  </Link>
);

export default NavLinkButton;
