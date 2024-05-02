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

const Home: FC = () => {
  // const data = useSelector((state: RootState) => state.home);
  const data = {
    loading: false,
    trending: [
      {
        adult: false,
        backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        genre_ids: [28, 878, 12],
        id: 823464,
        original_language: "en",
        original_title: "Godzilla x Kong: The New Empire",
        overview:
          "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        popularity: 1611.66,
        poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        video: false,
        vote_average: 6.621,
        vote_count: 821,
      },
      {
        adult: false,
        backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        genre_ids: [28, 878, 12],
        id: 823464,
        original_language: "en",
        original_title: "Godzilla x Kong: The New Empire",
        overview:
          "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        popularity: 1611.66,
        poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        video: false,
        vote_average: 6.621,
        vote_count: 821,
      },
      {
        adult: false,
        backdrop_path: "/jnE1GA7cGEfv5DJBoU2t4bZHaP4.jpg",
        genre_ids: [28, 878],
        id: 1094844,
        original_language: "en",
        original_title: "Ape vs. Mecha Ape",
        overview:
          "Recognizing the destructive power of its captive giant Ape, the military makes its own battle-ready A.I., Mecha Ape. But its first practical test goes horribly wrong, leaving the military no choice but to release the imprisoned giant ape to stop the colossal robot before it destroys downtown Chicago.",
        popularity: 1540.785,
        poster_path: "/dJaIw8OgACelojyV6YuVsOhtTLO.jpg",
        release_date: "2023-03-24",
        title: "Ape vs. Mecha Ape",
        video: false,
        vote_average: 6.146,
        vote_count: 24,
      },
      {
        adult: false,
        backdrop_path: "/jnE1GA7cGEfv5DJBoU2t4bZHaP4.jpg",
        genre_ids: [28, 878],
        id: 1094844,
        original_language: "en",
        original_title: "Ape vs. Mecha Ape",
        overview:
          "Recognizing the destructive power of its captive giant Ape, the military makes its own battle-ready A.I., Mecha Ape. But its first practical test goes horribly wrong, leaving the military no choice but to release the imprisoned giant ape to stop the colossal robot before it destroys downtown Chicago.",
        popularity: 1540.785,
        poster_path: "/dJaIw8OgACelojyV6YuVsOhtTLO.jpg",
        release_date: "2023-03-24",
        title: "Ape vs. Mecha Ape",
        video: false,
        vote_average: 6.146,
        vote_count: 24,
      },
      {
        adult: false,
        backdrop_path: "/jnE1GA7cGEfv5DJBoU2t4bZHaP4.jpg",
        genre_ids: [28, 878],
        id: 1094844,
        original_language: "en",
        original_title: "Ape vs. Mecha Ape",
        overview:
          "Recognizing the destructive power of its captive giant Ape, the military makes its own battle-ready A.I., Mecha Ape. But its first practical test goes horribly wrong, leaving the military no choice but to release the imprisoned giant ape to stop the colossal robot before it destroys downtown Chicago.",
        popularity: 1540.785,
        poster_path: "/dJaIw8OgACelojyV6YuVsOhtTLO.jpg",
        release_date: "2023-03-24",
        title: "Ape vs. Mecha Ape",
        video: false,
        vote_average: 6.146,
        vote_count: 24,
      },
    ],
    recommendations: [
      {
        adult: false,
        backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        genre_ids: [28, 878, 12],
        id: 823464,
        original_language: "en",
        original_title: "Godzilla x Kong: The New Empire",
        overview:
          "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        popularity: 1611.66,
        poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        video: false,
        vote_average: 6.621,
        vote_count: 821,
      },
      {
        adult: false,
        backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        genre_ids: [28, 878, 12],
        id: 823464,
        original_language: "en",
        original_title: "Godzilla x Kong: The New Empire",
        overview:
          "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        popularity: 1611.66,
        poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        video: false,
        vote_average: 6.621,
        vote_count: 821,
      },
      {
        adult: false,
        backdrop_path: "/jnE1GA7cGEfv5DJBoU2t4bZHaP4.jpg",
        genre_ids: [28, 878],
        id: 1094844,
        original_language: "en",
        original_title: "Ape vs. Mecha Ape",
        overview:
          "Recognizing the destructive power of its captive giant Ape, the military makes its own battle-ready A.I., Mecha Ape. But its first practical test goes horribly wrong, leaving the military no choice but to release the imprisoned giant ape to stop the colossal robot before it destroys downtown Chicago.",
        popularity: 1540.785,
        poster_path: "/dJaIw8OgACelojyV6YuVsOhtTLO.jpg",
        release_date: "2023-03-24",
        title: "Ape vs. Mecha Ape",
        video: false,
        vote_average: 6.146,
        vote_count: 24,
      },
      {
        adult: false,
        backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        genre_ids: [28, 878, 12],
        id: 823464,
        original_language: "en",
        original_title: "Godzilla x Kong: The New Empire",
        overview:
          "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        popularity: 1611.66,
        poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        video: false,
        vote_average: 6.621,
        vote_count: 821,
      },
      {
        adult: false,
        backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        genre_ids: [28, 878, 12],
        id: 823464,
        original_language: "en",
        original_title: "Godzilla x Kong: The New Empire",
        overview:
          "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        popularity: 1611.66,
        poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        video: false,
        vote_average: 6.621,
        vote_count: 821,
      },
      {
        adult: false,
        backdrop_path: "/jnE1GA7cGEfv5DJBoU2t4bZHaP4.jpg",
        genre_ids: [28, 878],
        id: 1094844,
        original_language: "en",
        original_title: "Ape vs. Mecha Ape",
        overview:
          "Recognizing the destructive power of its captive giant Ape, the military makes its own battle-ready A.I., Mecha Ape. But its first practical test goes horribly wrong, leaving the military no choice but to release the imprisoned giant ape to stop the colossal robot before it destroys downtown Chicago.",
        popularity: 1540.785,
        poster_path: "/dJaIw8OgACelojyV6YuVsOhtTLO.jpg",
        release_date: "2023-03-24",
        title: "Ape vs. Mecha Ape",
        video: false,
        vote_average: 6.146,
        vote_count: 24,
      },
    ],
    error: undefined,
  };
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(fetchTrending());
  //   dispatch(fetchRecommendations());
  // }, []);

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mt-6">Trending</h1>
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

      <h2 className="text-3xl font-bold mt-6">Recommendations</h2>
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
    </PageLayout>
  );
};
export default Home;
