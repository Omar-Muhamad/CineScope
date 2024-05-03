import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";

import PageLayout from "@/components/layout/PageLayout";
import GridLayout from "@/components/layout/GridLayout";
import ItemCard from "@/components/ui/ItemCard";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchRecommendations, fetchTrending } from "@/redux/home/homeSlice";
import { ItemData } from "@/types";
import Trending from "@/components/home/Trending";
import TrendingCard from "@/components/home/TrendingCard";
import Heading from "@/components/ui/Heading";

const Home: FC = () => {
  const data = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchRecommendations({ id: "693134" }));
  }, [dispatch]);

  return (
    <PageLayout>
      <Heading as="h1" className="mt-6">
        Trending
      </Heading>
      <Trending>
        {data.loading && <p>Loading...</p>}
        {!data.loading && data.error ? <p>error</p> : null}

        {!data.loading && data.trending && data.trending.length !== 0
          ? data.trending.slice(0, 5).map((item: Partial<ItemData>) =>
              item.media_type === "movie" ? (
                <NavLink to={`/movie/${item.id}`} key={item.id}>
                  <TrendingCard
                    imgSrc={item.backdrop_path}
                    releaseDate={item.release_date?.substring(0, 4)}
                    mediaType={item.media_type}
                    ratings={item.adult ? "18+" : "PG"}
                    title={item.title}
                  />
                </NavLink>
              ) : (
                <NavLink to={`/tv/${item.id}`} key={item.id}>
                  <TrendingCard
                    imgSrc={item.backdrop_path}
                    releaseDate={item.first_air_date?.substring(0, 4)}
                    mediaType="tv"
                    ratings={item.adult ? "18+" : "PG"}
                    title={item.name}
                  />
                </NavLink>
              )
            )
          : null}
      </Trending>

      <section>
        <Heading as="h2">Recommendations</Heading>
        <GridLayout>
          {!data.loading &&
          data.recommendations &&
          data.recommendations.length !== 0
            ? data.recommendations.map((item: Partial<ItemData>) =>
                item.media_type === "movie" ? (
                  <NavLink to={`/movie/${item.id}`} key={item.id}>
                    <ItemCard
                      imgSrc={item.backdrop_path}
                      releaseDate={item.release_date?.substring(0, 4)}
                      mediaType={item.media_type}
                      ratings={item.adult ? "18+" : "PG"}
                      title={item.title}
                    />
                  </NavLink>
                ) : (
                  <NavLink to={`/tv/${item.id}`} key={item.id}>
                    <ItemCard
                      imgSrc={item.backdrop_path}
                      releaseDate={item.first_air_date?.substring(0, 4)}
                      mediaType="tv"
                      ratings={item.adult ? "18+" : "PG"}
                      title={item.name}
                    />
                  </NavLink>
                )
              )
            : null}
        </GridLayout>
      </section>
    </PageLayout>
  );
};
export default Home;
