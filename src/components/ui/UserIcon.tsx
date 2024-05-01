import { FC } from "react";

type UserIconProps = {
  isLogged: boolean;
};

const UserIcon: FC<UserIconProps> = ({ isLogged }) => {
  return (
    <>
      {isLogged ? (
        <button>
          <img src="" alt="" />
        </button>
      ) : (
        <button className="h-8 w-8">
          <img className="h-full w-full" src="/src/assets/icons/user.png" alt="Empty user image" />
        </button>
      )}
    </>
  );
};
export default UserIcon;
