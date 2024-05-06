import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { IoBookmark } from "react-icons/io5";
import { RiFilmFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import NavIcon from "../ui/NavIcon";
import Logo  from "@/assets/icons/logo.svg";
import { getUserDetails } from "@/redux/user/userSlice";
import UserCard from "../ui/UserCard";

const navLinks = [
  { id: 1, title: "movies", path: "/movies", icon: RiFilmFill },
  { id: 2, title: "tv", path: "/tv", icon: PiTelevisionSimpleFill },
  { id: 3, title: "bookmarked", path: "/bookmarked", icon: IoBookmark },
];

const Navbar: FC = () => {
  const [isUserIconClicked, setIsUserIconClicked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    setIsUserIconClicked(!isUserIconClicked);
  };

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    if (session_id) {
      setIsLogged(true);
      dispatch(getUserDetails({ session_id: session_id as string }));
    }
  }, [dispatch]);

  return (
    
    <nav className="relative flex md:flex-col justify-between items-center md:m-6 p-6 md:px-5 bg-secondary-dark md:rounded-2xl">
      <NavLink to="/" className="h-7 w-7 md:h-8 md:w-8">
        <Logo />
      </NavLink>
      <div className="nav-links md:-mt-72 flex md:flex-col items-center gap-6">
        {navLinks.map((link) => (
          <NavIcon key={link.id} link={link} />
        ))}
      </div>
      <button className="h-10 w-10" onClick={handleClick}>
        <img
          className="h-full w-full rounded-full border-2 border-transparent hover:border-orange"
          src={
            isLogged
              ? `https://gravatar.com/avatar/${user?.gravatar}`
              : "/src/assets/icons/user.png"
          }
          alt="User logo"
        />
      </button>
      {isUserIconClicked && <UserCard user={user} isLogged={isLogged} />}
    </nav>
  );
};
export default Navbar;
