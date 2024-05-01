import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchMovies } from "../redux/movies/moviesSlice";
import { ItemData } from "@/types";
import { NavLink } from "react-router-dom";

const Movies: FC = () => {
  const data = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <>
      <h1 className="text-xl">Popular Movies</h1>
      {data.loading && <p>Loading...</p>}
      {!data.loading && data.error ? <p>error</p> : null}
      <ul>
        {!data.loading && data.movies && data.movies.length !== 0
          ? data.movies.map((item: Partial<ItemData>) => (
              <NavLink to={`/movie/${item.id}`} key={item.id}>
                <li>{item.title}</li>
              </NavLink>
            ))
          : null}
      </ul>
    </>
  );
};

export default Movies;
