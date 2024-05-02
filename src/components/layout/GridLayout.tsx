import { FC } from "react";

type GridLayoutProps = {
  children: React.ReactNode;
};

const GridLayout: FC<GridLayoutProps> = ({ children }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {children}
    </ul>
  );
};
export default GridLayout;
