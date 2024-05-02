import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import PageLayout from "@/components/layout/PageLayout";
import ItemCard from "@/components/ui/ItemCard";
import GridLayout from "@/components/layout/GridLayout";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMovies } from "@/redux/movies/moviesSlice";
import { ItemData } from "@/types";

const Movies: FC = () => {
  const data = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <PageLayout>
      <h1 className="text-xl mt-6">Popular Movies</h1>
      <GridLayout>
      {data.loading && <p>Loading...</p>}
      {!data.loading && data.error ? <p>error</p> : null}
        {!data.loading && data.movies && data.movies.length !== 0
          ? data.movies.map((item: Partial<ItemData>) => (
              <NavLink to={`/movie/${item.id}`} key={item.id}>
                <ItemCard
                  imgSrc={item.backdrop_path}
                  releaseDate={item.release_date?.substring(0, 4)}
                  mediaType={item.media_type}
                  ratings={item.adult ? "18+" : "PG"}
                  title={item.title}
                />
              </NavLink>
            ))
          : null}
      </GridLayout>
    </PageLayout>
  );
};

export default Movies;
