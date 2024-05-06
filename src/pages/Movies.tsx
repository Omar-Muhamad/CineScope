import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageLayout from "@/components/layout/PageLayout";
import ItemCard from "@/components/ui/ItemCard";
import GridLayout from "@/components/layout/GridLayout";
import Heading from "@/components/ui/Heading";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMovies } from "@/redux/movies/moviesSlice";
import Loading from "@/components/ui/Loading";

const Movies: FC = () => {
  const data = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, movies, error } = data;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    // <Suspense fallback={<Loading />}>
      <PageLayout>
        {loading && <Loading />}
        <Heading as="h1">Popular Movies</Heading>
        <GridLayout>
          {!loading && error ? <p>error</p> : null}
          {!loading && movies && movies.length !== 0
            ? movies.map((movie) => (
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
      </PageLayout>
    // </Suspense>
  );
};

export default Movies;
