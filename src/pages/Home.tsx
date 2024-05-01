import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchRecommendations, fetchTrending } from "../redux/home/homeSlice";
import { ItemData } from "@/types";

const Home = () => {
  const data = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();

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
          ? data.trending
              .slice(0, 4)
              .map((item: ItemData) => <li key={item.id}>{item.title}</li>)
          : null}
      </ul>

      <h2 className="text-xl">Recommendations</h2>

      <ul>
        {!data.loading &&
        data.recommendations &&
        data.recommendations.length !== 0
          ? data.recommendations.map((item: ItemData) => (
              <li key={item.id}>{item.title}</li>
            ))
          : null}
      </ul>
    </>
  );
};
export default Home;
