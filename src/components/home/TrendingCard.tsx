import { FC } from "react";
import { NavLink } from "react-router-dom";

import Text from "../ui/Text";
import BookMark from "../ui/BookMark";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevisionSimpleFill } from "react-icons/pi";

type TrendingCardProps = {
  id: number | undefined;
  imgSrc: string | undefined;
  releaseDate: string | undefined;
  media_type: string | undefined;
  ratings: string | undefined;
  title: string | undefined;
};

const TrendingCard: FC<TrendingCardProps> = ({
  id: id,
  imgSrc,
  releaseDate,
  media_type,
  ratings,
  title,
}) => {
  const movie = media_type === "movie";
  return (
    <li className="relative">
      <div className="relative item-image w-[60vw] md:w-[500px]">
        <BookMark
          id={id}
          media_type={media_type}
          className="absolute right-4 top-4"
        />
        <NavLink to={movie ? `/movie/${id}` : `/tv/${id}`}>
          <img
            className="w-full rounded-lg"
            loading="eager"
            src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2/${imgSrc}`}
            alt={`${title} poster`}
          />
        </NavLink>
      </div>

      <div className="absolute bottom-5 left-7 item-description">
        <div className="flex gap-2">
          <Text>{releaseDate}</Text>
          <span>•</span>
          <div className="media-type flex items-center gap-1">
            {media_type === "movie" ? (
              <RiFilmFill className="text-md" />
            ) : (
              <PiTelevisionSimpleFill className="text-md" />
            )}
            <Text>{media_type}</Text>
          </div>
          <span>•</span>
          <Text>{ratings}</Text>
        </div>
        <NavLink to={movie ? `/movie/${id}` : `/tv/${id}`} key={id}>
          <h2 className="font-outfitMedium text-2xl">
            {title}
          </h2>
        </NavLink>
      </div>
    </li>
  );
};
export default TrendingCard;
