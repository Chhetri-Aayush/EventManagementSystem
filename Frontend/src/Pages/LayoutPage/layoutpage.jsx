import { Outlet } from "react-router-dom";
import NavBar from "../../Layout/Navbar/navbar";
import Footer from "../../Layout/Footer/footer";
import styles from "./layoutpage.module.css";

function Layout() {
  return (
    <>
      <div className={`${styles.HomeDiv}`}>
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
