export type ItemData = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  adult: boolean;
  title?: string;
  name?: string;
  first_air_date?: string;
  origin_country?: string[];
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
};

