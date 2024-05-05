import GridLayout from "@/components/layout/GridLayout";
import PageLayout from "@/components/layout/PageLayout";
import Heading from "@/components/ui/Heading";
import ItemCard from "@/components/ui/ItemCard";
import { ItemData, fetchBookmark } from "@/redux/bookmarked/bookmarkSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Favorites = () => {
  const { loading, bookmarks, error } = useSelector(
    (state: RootState) => state.bookmark
  );
  const dispatch = useDispatch<AppDispatch>();

  const movies = bookmarks?.filter((item) => item.media_type === "movie");
  const tvShows = bookmarks?.filter((item) => item.media_type === "tv");

  useEffect(() => {
    dispatch(fetchBookmark());
  }, []);

  return (
    <PageLayout>
      {loading && <p>Loading...</p>}
      {!loading && error ? <p>error</p> : null}
      <section>
        <Heading as="h2">Bookmarked Movies</Heading>
        {!loading && movies && movies?.length !== 0 ? (
          <GridLayout>
            {movies?.map((movie: Partial<ItemData>) => (
              <NavLink to={`/movie/${movie.id}`} key={movie.id}>
                <ItemCard
                  imgSrc={movie.backdrop_path}
                  releaseDate={movie.release_date?.substring(0, 4)}
                  mediaType="movie"
                  ratings={movie.adult ? "18+" : "PG"}
                  title={movie.title}
                />
              </NavLink>
            ))}
          </GridLayout>
        ) : (
          <div className="">No Bookmarked Movies...</div>
        )}
      </section>
      <section>
        <Heading as="h2">Bookmarked TV Shows</Heading>
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
          <div className="">No Bookmarked TV Shows...</div>
        )}
      </section>
    </PageLayout>
  );
};
export default Favorites;
