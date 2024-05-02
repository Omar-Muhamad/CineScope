import { FC, ReactNode } from "react";
import SearchBox from "../common/SearchBox";

type PageLayoutProps = { children: ReactNode };

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="page-layout md:pt-6 md:ml-32 pl-6 md:pl-0">
      <SearchBox />
      {children}
    </main>
  );
};
export default PageLayout;
