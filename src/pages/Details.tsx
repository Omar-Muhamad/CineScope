import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchDetails } from "@/redux/details/detailsSlice";
import DetailsHeader from "@/components/details/DetailsHeader";
import GridLayout from "@/components/layout/GridLayout";
import { fetchRecommendations } from "@/redux/home/homeSlice";
import ItemCard from "@/components/ui/ItemCard";
import { ItemData } from "@/types";
import Heading from "@/components/ui/Heading";

const Details: FC = () => {
  const data = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch<AppDispatch>();
  const { mediaType, id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails({ mediaType, id }));
    dispatch(fetchRecommendations({ id: "693134" }));
  }, [dispatch, id, mediaType]);

  return (
    <main className="page-layout md:ml-32 md:pl-0">
      <div className="">
        {data.loading && <p>Loading...</p>}
        {!data.loading && data.error ? <p>error</p> : null}

        {!data.loading && data.details ? (
          mediaType === "movie" ? (
            <DetailsHeader
              id={data.details.id}
              posterUrl={data.details.poster_path}
              title={data.details.title}
              imageSrc={data.details.backdrop_path}
              releaseDate={data.details.release_date?.substring(0, 4)}
              mediaType={mediaType}
              genres={data.details.genres}
              rating={data.details.vote_average?.toFixed(1)}
              overview={data.details.overview}
            />
          ) : (
            <DetailsHeader
              id={data.details.id}
              posterUrl={data.details.poster_path}
              title={data.details.name}
              imageSrc={data.details.backdrop_path}
              releaseDate={data.details.first_air_date?.substring(0, 4)}
              mediaType={mediaType}
              genres={data.details.genres}
              rating={data.details.vote_average?.toFixed(1)}
              overview={data.details.overview}
            />
          )
        ) : null}
      </div>
      <section className="pl-6 md:pl-0">
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
    </main>
  );
};

export default Details;
