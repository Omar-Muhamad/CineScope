import { FC } from "react";

type GridLayoutProps = {
  children: React.ReactNode;
  heading?: string;
};

const GridLayout: FC<GridLayoutProps> = ({ children, heading }) => {
  return (
    <>
      <h2>{heading}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </ul>
    </>
  );
};
export default GridLayout;
