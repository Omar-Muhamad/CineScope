import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import PageLayout from "@/components/layout/PageLayout";
import ItemCard from "@/components/ui/ItemCard";
import GridLayout from "@/components/layout/GridLayout";
import Heading from "@/components/ui/Heading";
import { AppDispatch, RootState } from "@/redux/store";
import {
  MovieData,
  fetchMovies,
  moviesPagination,
} from "@/redux/movies/moviesSlice";
import Loading from "@/components/ui/Loading";

const Movies: FC = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const data = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, movies, error } = data;
  const { page, total_pages, results } = movies;

  const endOffset = itemOffset + 20;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = results.slice(itemOffset, endOffset);
  const pageCount = total_pages > 100 ? 100 : total_pages;

  const handlePageClick = async (event: { selected: number }) => {
    const newOffset = (event.selected * 20) % results.length;
    await dispatch(moviesPagination({ currentPage: event.selected + 1 }));
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <PageLayout>
      <Heading as="h1">Popular Movies</Heading>
      {loading && <Loading />}
      <GridLayout>
        {!loading && error ? <p>error</p> : null}
        {!loading && currentItems && currentItems.length !== 0
          ? currentItems.map((movie: MovieData) => (
              <ItemCard
                key={movie.id}
                id={movie.id}
                imgSrc={movie.backdrop_path}
                releaseDate={movie.release_date?.substring(0, 4)}
                media_type="movie"
                ratings={movie.adult ? "18+" : "PG"}
                title={movie.title}
              />
            ))
          : null}
      </GridLayout>
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
    </PageLayout>
  );
};

export default Movies;
