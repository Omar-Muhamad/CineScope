import { FC } from "react";

type UserIconProps = {
  isLogged: boolean;
  hash: string | undefined;
};

const UserIcon: FC<UserIconProps> = ({ isLogged, hash }) => {
  return (
    <button className="h-10 w-10">
      <img
        className="h-full w-full rounded-full border-2 border-transparent hover:border-orange"
        src={ isLogged ? `https://gravatar.com/avatar/${hash}`: "/src/assets/icons/user.png"}
        alt="User logo"
      />
    </button>
  );
};
export default UserIcon;
