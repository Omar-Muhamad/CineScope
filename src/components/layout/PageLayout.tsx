import { FC, ReactNode } from "react";
import SearchBox from "../common/SearchBox";

type PageLayoutProps = { children: ReactNode };

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="h-[100svh] overflow-auto">
      <SearchBox />
      {children}
    </main>
  );
};
export default PageLayout;
