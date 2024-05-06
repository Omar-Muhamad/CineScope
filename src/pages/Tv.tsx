import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageLayout from "@/components/layout/PageLayout";
import ItemCard from "@/components/ui/ItemCard";
import GridLayout from "@/components/layout/GridLayout";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTv } from "@/redux/tv/tvSlice";
import Heading from "@/components/ui/Heading";
import Loading from "@/components/ui/Loading";

const Tv: FC = () => {
  const data = useSelector((state: RootState) => state.tv);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, tv, error } = data;

  useEffect(() => {
    dispatch(fetchTv());
  }, [dispatch]);

  return (
    <PageLayout>
      {loading && <Loading />}
      <Heading as="h1">Popular TV Shows</Heading>
      {!loading && error ? <p>error</p> : null}
      <GridLayout>
        {!loading && tv && tv.length !== 0
          ? tv.map((tvShow) => (
              <ItemCard
                key={tvShow.id}
                id={tvShow.id}
                imgSrc={tvShow.backdrop_path}
                releaseDate={tvShow.first_air_date?.substring(0, 4)}
                media_type="tv"
                ratings={tvShow.adult ? "18+" : "PG"}
                title={tvShow.name}
              />
            ))
          : null}
      </GridLayout>
    </PageLayout>
  );
};

export default Tv;
