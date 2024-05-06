import { FC } from "react";

type TrendingProps = { children: React.ReactNode };

const Trending: FC<TrendingProps> = ({ children }) => {
  return (
    <div className="w-full overflow-x-scroll no-scrollbar mt-6">
      <ul className="carousel flex gap-6 animate-slide">{children}</ul>
    </div>
  );
};
export default Trending;
