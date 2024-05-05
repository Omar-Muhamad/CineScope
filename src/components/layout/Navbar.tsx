import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { HiMiniBookmark } from "react-icons/hi2";
import { RiFilmFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import UserIcon from "../ui/UserIcon";
import NavIcon from "../ui/NavIcon";
import logo from "@/assets/icons/logo.svg";
import { getUserDetails } from "@/redux/user/userSlice";

const navLinks = [
  { id: 1, title: "movies", path: "/movies", icon: RiFilmFill },
  { id: 2, title: "tv", path: "/tv", icon: PiTelevisionSimpleFill },
  { id: 3, title: "favorites", path: "/favorites", icon: HiMiniBookmark },
];

const Navbar: FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const session_id = localStorage.getItem("session_id")
    if (session_id) {
      setIsLogged(true);
      dispatch(getUserDetails({ session_id: session_id as string }));
    }
  }, [dispatch]);

  return (
    <nav className="flex md:flex-col justify-between items-center md:m-6 p-6 md:px-5 bg-secondary-dark md:rounded-2xl">
      <NavLink to="/" className="main-logo">
        <img
          className="h-7 w-7 md:h-8 md:w-8"
          src={logo}
          alt="Cine Scope logo"
        />
      </NavLink>
      <div className="nav-links md:-mt-72 flex md:flex-col items-center gap-6">
        {navLinks.map((link) => (
          <NavIcon key={link.id} link={link} />
        ))}
      </div>
      <UserIcon isLogged={isLogged} hash={user?.gravatar} />
    </nav>
  );
};
export default Navbar;
