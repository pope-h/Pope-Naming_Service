/**
 * Renders the layout of the application.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <main className="relative flex flex-col bg-neutral-100">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;