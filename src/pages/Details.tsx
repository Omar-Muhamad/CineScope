import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchDetails } from "@/redux/details/detailsSlice";
import DetailsHeader from "@/components/details/DetailsHeader";
import GridLayout from "@/components/layout/GridLayout";
import { fetchRecommendations } from "@/redux/home/homeSlice";
import ItemCard from "@/components/ui/ItemCard";
import Heading from "@/components/ui/Heading";

const Details: FC = () => {
  const data = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch<AppDispatch>();
  const { media_type, id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails({ media_type, id })).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        const detailsData = data.payload;
        const { id } = detailsData;
        dispatch(fetchRecommendations({ id, media_type }));
      }
    });
  }, [dispatch, id, media_type]);

  return (
    <main className="page-layout md:ml-32 md:pl-0">
      <div className="">
        {data.loading && <p>Loading...</p>}
        {!data.loading && data.error ? <p>error</p> : null}

        {!data.loading && data.details ? (
          <DetailsHeader
            id={data.details.id}
            posterUrl={data.details.poster_path}
            title={
              media_type === "movie" ? data.details.title : data.details.name
            }
            imageSrc={data.details.backdrop_path}
            release_date={
              media_type === "movie"
                ? data.details.release_date?.substring(0, 4)
                : data.details.first_air_date?.substring(0, 4)
            }
            media_type={media_type === "movie" ? "movie" : "tv"}
            genres={data.details.genres}
            rating={data.details.vote_average}
            overview={data.details.overview}
          />
        ) : null}
      </div>
      <section className="pl-6 md:pl-0">
        <Heading as="h2">Recommendations</Heading>
        <GridLayout>
          {!data.loading &&
          data.recommendations &&
          data.recommendations.length !== 0
            ? data.recommendations.map((item) => {
                const movie = item.media_type === "movie";
                return (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    imgSrc={item.backdrop_path}
                    releaseDate={
                      movie
                        ? item.release_date?.substring(0, 4)
                        : item.first_air_date?.substring(0, 4)
                    }
                    media_type={movie ? "movie" : "tv"}
                    ratings={item.adult ? "18+" : "PG"}
                    title={movie ? item.title : item.name}
                  />
                );
              })
            : null}
        </GridLayout>
      </section>
    </main>
  );
};

export default Details;
