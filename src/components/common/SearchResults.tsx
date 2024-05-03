import { DataState } from "@/redux/search/searchSlice";
import { ItemData } from "@/types";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import ItemCard from "../ui/ItemCard";
import GridLayout from "../layout/GridLayout";

type SearchResultsProps = {
  data: DataState;
};

const SearchResults: FC<SearchResultsProps> = ({ data }) => {
  const { loading, searchData, error } = data;
  const movies = searchData?.filter((item) => item.media_type === "movie");
  const tvShows = searchData?.filter((item) => item.media_type === "tv");
  return (
    <>
    <h1 className="mt-10 text-3xl font-bold">Search Results</h1>
      {loading && <p>Loading...</p>}
      {!loading && error ? <p>error</p> : null}
      <section className="movies mt-6">
        <h2 className="text-3xl">Movies</h2>
        {!loading && movies && movies?.length !== 0 ? (
          <GridLayout>
            {movies?.map((movie: Partial<ItemData>) => (
              <NavLink to={`/movie/${movie.id}`} key={movie.id}>
                <ItemCard
                  imgSrc={movie.backdrop_path}
                  releaseDate={movie.release_date?.substring(0, 4)}
                  mediaType={movie.media_type}
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
      <section className="movies">
        <h2 className="tv-shows mt-6 text-3xl">TV Shows</h2>
      {!loading && tvShows && tvShows?.length !== 0 ? (
          <GridLayout>
            {tvShows?.map((tvShow: Partial<ItemData>) => (
              <NavLink to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <ItemCard
                  imgSrc={tvShow.backdrop_path}
                  releaseDate={tvShow.first_air_date?.substring(0, 4)}
                  mediaType="tv"
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
    </>
  );
};
export default SearchResults;
