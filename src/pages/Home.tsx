import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchRecommendations, fetchTrending } from "../redux/home/homeSlice";
import { ItemData } from "@/types";
import { NavLink } from "react-router-dom";

const Home: FC = () => {
  const data = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();

  console.log(data.trending?.slice(0, 4));

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchRecommendations());
  }, []);

  return (
    <>
      <h1 className="text-xl">Trending</h1>
      {data.loading && <p>Loading...</p>}
      {!data.loading && data.error ? <p>error</p> : null}
      <ul>
        {!data.loading && data.trending && data.trending.length !== 0
          ? data.trending.slice(0, 4).map((item: Partial<ItemData>) =>
              item.media_type === "movie" ? (
                <NavLink to={`/movie/${item.id}`} key={item.id}>
                  <li>{item.title}</li>
                </NavLink>
              ) : (
                <NavLink to={`/tv/${item.id}`} key={item.id}>
                  <li>{item.name}</li>
                </NavLink>
              )
            )
          : null}
      </ul>

      <h2 className="text-xl">Recommendations</h2>

      <ul>
        {!data.loading &&
        data.recommendations &&
        data.recommendations.length !== 0
          ? data.recommendations.map((item: Partial<ItemData>) =>
              item.media_type === "movie" ? (
                <NavLink to={`/movie/${item.id}`} key={item.id}>
                  <li>{item.title}</li>
                </NavLink>
              ) : (
                <NavLink to={`/tv/${item.id}`} key={item.id}>
                  <li>{item.name}</li>
                </NavLink>
              )
            )
          : null}
      </ul>
    </>
  );
};
export default Home;
