import { FC, ReactNode } from "react";
import SearchBox from "../common/SearchBox";

type PageLayoutProps = { children: ReactNode };

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="mt-6 pt-6 md:ml-32">
      <SearchBox />
      {children}
    </main>
  );
};
export default PageLayout;
