import { Outlet } from "react-router-dom";

import Navbar from "../shared/Navbar";
import { Fragment } from "react";

function MainLayout() {
  return (
    <>
      <header className="container mx-auto mb-10">
        <Navbar />
      </header>

      <section className="container mx-auto">
        <Outlet />
      </section>
    </>
  );
}

export default MainLayout;
