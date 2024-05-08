import { FC, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

import { DataState, SearchResult, searchPagination } from "@/redux/search/searchSlice";
import ItemCard from "../ui/ItemCard";
import GridLayout from "../layout/GridLayout";
import Heading from "../ui/Heading";
import Loading from "../ui/Loading";
import { AppDispatch } from "@/redux/store";

type SearchResultsProps = {
  data: DataState;
};

const SearchResults: FC<SearchResultsProps> = ({ data }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [searchParams] = useSearchParams();

  const { loading, searchData, error } = data;
  const {page, total_pages, results} = searchData;
  const query = searchParams.get("search");
  const dispatch = useDispatch<AppDispatch>();
  
  const endOffset = itemOffset + 20;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = results.slice(itemOffset, endOffset);
  const pageCount = total_pages > 100 ? 100 : total_pages;

  const movies = currentItems?.filter((item: SearchResult) => item.media_type === "movie");
  const tvShows = currentItems?.filter((item: SearchResult) => item.media_type === "tv");

  const handlePageClick = async (event: { selected: number }) => {
    const newOffset = (event.selected * 20) % results.length;
    await dispatch(searchPagination({ currentPage: event.selected + 1, query }));
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <main>
      <Heading as="h1">Search Results</Heading>
      {loading && <Loading />}
      {!loading && error ? <p>error</p> : null}
      <section>
        <Heading as="h2">Movies</Heading>
        {!loading && movies && movies?.length !== 0 ? (
          <GridLayout>
            {movies?.map((movie: SearchResult) => (
              <NavLink to={`/movie/${movie.id}`} key={movie.id}>
                <ItemCard
                  id={movie.id}
                  imgSrc={movie.backdrop_path}
                  releaseDate={movie.release_date?.substring(0, 4)}
                  media_type={movie.media_type}
                  ratings={movie.adult ? "18+" : "PG"}
                  title={movie.title}
                />
              </NavLink>
            ))}
          </GridLayout>
        ) : (
          <div className="">No movies match your search</div>
        )}
      </section>
      <section>
        <Heading as="h2">TV Shows</Heading>
        {!loading && tvShows && tvShows?.length !== 0 ? (
          <GridLayout>
            {tvShows?.map((tvShow: SearchResult) => (
              <NavLink to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <ItemCard
                  id={tvShow.id}
                  imgSrc={tvShow.backdrop_path}
                  releaseDate={tvShow.first_air_date?.substring(0, 4)}
                  media_type="tv"
                  ratings={tvShow.adult ? "18+" : "PG"}
                  title={tvShow.name}
                />
              </NavLink>
            ))}
          </GridLayout>
        ) : (
          <div className="">No movies match your search</div>
        )}
      </section>
      <div className="pr-6 md:pr-0">
        <ReactPaginate
          nextAriaLabel="next"
          previousAriaLabel="previous"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          marginPagesDisplayed={1}
          forcePage={page - 1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          className="mt-8 bg-secondary-dark w-full md:w-fit mx-auto p-2 md:p-4 rounded-lg flex items-center justify-center gap-2 md:gap-5 text-lg text-white font-outfitMedium"
          pageClassName="px-2 rounded-md"
          activeClassName="px-2 md:px-3 py-[3px] bg-orange rounded-full"
          activeLinkClassName="md:w-3 md:h-3 bg-orange"
          previousClassName="px-2 md:px-4 py-1 bg-orange rounded-md cursor-pointer hover:bg-white hover:text-orange"
          nextClassName="px-2 md:px-4 py-1 bg-orange rounded-md cursor-pointer hover:bg-white hover:text-orange"
        />
      </div>
    </main>
  );
};
export default SearchResults;
