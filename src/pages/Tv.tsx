import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchTv } from "../redux/tv/tvSlice";
import { ItemData } from "@/types";
import { NavLink } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const Tv: FC = () => {
  const data = useSelector((state: RootState) => state.tv);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTv());
  }, []);

  return (
    <PageLayout>
      <h1 className="text-xl">Popular TV Shows</h1>
      {data.loading && <p>Loading...</p>}
      {!data.loading && data.error ? <p>error</p> : null}
      <ul>
        {!data.loading && data.tv && data.tv.length !== 0
          ? data.tv.map((item: Partial<ItemData>) => (
              <NavLink to={`/tv/${item.id}`} key={item.id}>
                <li>{item.name}</li>
              </NavLink>
            ))
          : null}
      </ul>
    </PageLayout>
  );
};

export default Tv;