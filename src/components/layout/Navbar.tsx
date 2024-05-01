import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserIcon from "../ui/UserIcon";
import NavIcon from "../ui/NavIcon";
import logo from "@/assets/icons/logo.svg";

const navLinks = [
  { id: 1, title: "movies", path: "/movies" },
  { id: 2, title: "tv", path: "/tv" },
  { id: 3, title: "search", path: "/search" },
  { id: 4, title: "favorites", path: "/favorites" },
];

const Navbar = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <nav className="flex flex-col justify-between items-center m-6 bg-secondary-dark rounded-2xl p-6">
      <NavLink to="/" className="main-logo">
        <img className="h-8 w-8" src={logo} alt="Cine Scope logo" />
      </NavLink>
      <ul className="nav-links flex flex-col items-center gap-4">
        {navLinks.map((link) => (
          <NavIcon title={link.title} path={link.path} key={link.id} />
        ))}
      </ul>
      <UserIcon isLogged={isLogged} />
    </nav>
  );
};
export default Navbar;
