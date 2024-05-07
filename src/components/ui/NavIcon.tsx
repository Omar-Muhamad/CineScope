import { FC } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type NavIconProps = {
  link: {
    id: number;
    path: string;
    title: string;
    icon: IconType;
    areaLabel: string;
  };
};

const NavIcon: FC<NavIconProps> = ({ link }) => {
  const { path, icon, areaLabel } = link;
  const Icon = icon;
  return (
    <NavLink to={path} className="text-2xl text-gray hover:text-white aria-[current=page]:text-white" area-label={areaLabel} aria-current="page">
      <Icon />
    </NavLink>
  );
};
export default NavIcon;
