import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserIcon from "../ui/UserIcon";
import NavIcon from "../ui/NavIcon";
import logo from "@/assets/icons/logo.svg";

const navLinks = [
  { id: 1, title: "movies", path: "/movies" },
  { id: 2, title: "tv", path: "/tv" },
  { id: 4, title: "favorites", path: "/favorites" },
];

const Navbar = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <nav className="flex md:flex-col justify-between items-center md:m-6 p-6 bg-secondary-dark md:rounded-2xl">
      <NavLink to="/" className="main-logo">
        <img className="h-7 w-7 md:h-8 md:w-8" src={logo} alt="Cine Scope logo" />
      </NavLink>
      <ul className="nav-links flex md:flex-col items-center gap-6">
        {navLinks.map((link) => (
          <NavIcon title={link.title} path={link.path} key={link.id} />
        ))}
      </ul>
      <UserIcon isLogged={isLogged} />
    </nav>
  );
};
export default Navbar;
