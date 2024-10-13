import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Navbar  */}
        <header>
          <Header />
        </header>
        {/* Body  */}
        <div className="flex-1">
          <Outlet />
        </div>
        {/* Footer  */}

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
