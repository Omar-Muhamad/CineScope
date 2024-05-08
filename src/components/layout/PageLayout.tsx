import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import SearchBox from "../common/SearchBox";
import SearchResults from "../common/SearchResults";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSearch } from "@/redux/search/searchSlice";

type PageLayoutProps = { children: ReactNode };

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const searchData = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      dispatch(fetchSearch({ query }));
    }
  }, [searchParams, dispatch])
  return (
    <main className="page-layout pb-6 md:pt-6 md:ml-32 pl-6">
      <SearchBox />
      {searchQuery ? <SearchResults data={searchData} /> : children}
    </main>
  );
};
export default PageLayout;
