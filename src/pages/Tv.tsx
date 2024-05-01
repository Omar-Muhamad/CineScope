import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchTv } from "../redux/tv/tvSlice";
import { ItemData } from "@/types";

const Tv = () => {
  const data = useSelector((state: RootState) => state.tv);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTv());
  }, []);

  return (
    <>
      <h1 className="text-xl">Popular TV Shows</h1>
      {data.loading && <p>Loading...</p>}
      {!data.loading && data.error ? <p>error</p> : null}
      <ul>
        {!data.loading && data.tv && data.tv.length !== 0
          ? data.tv.map((item: ItemData) => <li key={item.id}>{item.title}</li>)
          : null}
      </ul>
    </>
  );
};

export default Tv;
