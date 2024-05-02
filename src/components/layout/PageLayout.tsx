import { FC, ReactNode } from "react";
import SearchBox from "../common/SearchBox";

type PageLayoutProps = { children: ReactNode };

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="mx-6 md:pt-6 md:ml-32 md:mr-6">
      <SearchBox />
      {children}
    </main>
  );
};
export default PageLayout;
