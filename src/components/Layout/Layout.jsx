// components/Layout/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import ExtraNavbar from "./Navbar/ExtraNavbar";
import NavBar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import MainSlider from "../MainSlider/MainSlider";

const Layout = () => {
  const location = useLocation();

  // Ejemplo: no mostrar el MainSlider en algunas páginas si querés
  const hideMainSlider = location.pathname.startsWith("/cart") || location.pathname.startsWith("/item");

  return (
    <>
      <ExtraNavbar />
      <NavBar />
      {!hideMainSlider && <MainSlider />}
      <Outlet /> {/* Aquí se renderiza la página */}
      <Footer />
    </>
  );
};

export default Layout;