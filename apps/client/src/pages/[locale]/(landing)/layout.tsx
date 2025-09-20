import { Outlet } from "react-router";

import { Footer } from "~/components/footer";
import { NavbarComponent } from "~/components/navbar";

export default function LandingLayout() {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </div>
  );
}
