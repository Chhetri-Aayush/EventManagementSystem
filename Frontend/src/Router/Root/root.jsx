import { Outlet } from "react-router-dom";
import Footer from "../../Layout/Footer/footer";
import NavBar from "../../Layout/Navbar/navbar";

function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
