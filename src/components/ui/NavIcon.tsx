import { FC } from "react";
import { NavLink } from "react-router-dom";

type NavIconProps = {
  path: string;
  title: string;
};

const NavIcon: FC<NavIconProps> = ({ path, title }) => {
  return (
    <NavLink to={path}>
      <div className="h-6 w-6">
        <img
          className="h-full w-full hover:fill-orange"
          src={`/src/assets/icons/icon-nav-${title}.svg`}
          alt={`Link for ${title} page`}
        />
      </div>
    </NavLink>
  );
};
export default NavIcon;
