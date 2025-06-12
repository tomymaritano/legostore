// components/Layout/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import ExtraNavbar from "../Navbars/ExtraNavbar";
import NavBar from "../Navbars/Navbar";
import Footer from "../Footer/footer";
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