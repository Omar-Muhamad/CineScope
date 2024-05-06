import { FC } from "react";
import { NavLink } from "react-router-dom";

import Text from "../ui/Text";
import Heading from "../ui/Heading";
import BookMark from "../ui/BookMark";

type TrendingCardProps = {
  id: number | undefined;
  imgSrc: string | undefined;
  releaseDate: string | undefined;
  mediaType: string | undefined;
  ratings: string | undefined;
  title: string | undefined;
};

const TrendingCard: FC<TrendingCardProps> = ({
  id: id,
  imgSrc,
  releaseDate,
  mediaType,
  ratings,
  title,
}) => {
  const movie = mediaType === "movie";
  return (
    <li className="relative">
      <div className="relative item-image w-[60vw] md:w-[30vw]">
        <BookMark
          id={id}
          media_type={mediaType}
          className="absolute right-4 top-4"
        />
        <NavLink to={movie ? `/movie/${id}` : `/tv/${id}`} key={id}>
          <img
            className="w-full rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${imgSrc}`}
            alt={`${title} poster`}
          />
        </NavLink>
      </div>

      <div className="absolute bottom-5 left-7 item-description">
        <div className="flex gap-2">
          <Text>{releaseDate}</Text>
          <span>•</span>
          <div className="media-type flex items-center gap-1">
            <img
              className="w-3 h-3"
              src={`/assets/icons/icon-category-${mediaType}.svg`}
              alt={`${mediaType} icon`}
            />
            <Text>{mediaType}</Text>
          </div>
          <span>•</span>
          <Text>{ratings}</Text>
        </div>
        <Heading as="h3" size="md">
          {title}
        </Heading>
      </div>
    </li>
  );
};
export default TrendingCard;
