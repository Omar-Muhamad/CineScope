import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import PageLayout from "@/components/layout/PageLayout";
import ItemCard from "@/components/ui/ItemCard";
import GridLayout from "@/components/layout/GridLayout";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTv } from "@/redux/tv/tvSlice";
import { ItemData } from "@/types";
import Heading from "@/components/ui/Heading";

const Tv: FC = () => {
  const data = useSelector((state: RootState) => state.tv);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTv());
  }, []);

  return (
    <PageLayout>
      <Heading as="h1">Popular TV Shows</Heading>
      {data.loading && <p>Loading...</p>}
      {!data.loading && data.error ? <p>error</p> : null}
      <GridLayout>
        {!data.loading && data.tv && data.tv.length !== 0
          ? data.tv.map((item: Partial<ItemData>) => (
              <NavLink to={`/tv/${item.id}`} key={item.id}>
                <ItemCard
                  imgSrc={item.backdrop_path}
                  releaseDate={item.first_air_date?.substring(0, 4)}
                  mediaType="tv"
                  ratings={item.adult ? "18+" : "PG"}
                  title={item.name}
                />
              </NavLink>
            ))
          : null}
      </GridLayout>
    </PageLayout>
  );
};

export default Tv;
