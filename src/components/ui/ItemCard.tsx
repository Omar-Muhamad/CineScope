import { FC } from "react";
import { NavLink } from "react-router-dom";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import Heading from "./Heading";
import Text from "./Text";
import BookMark from "./BookMark";

type ItemCardProps = {
  id?: number;
  imgSrc: string;
  releaseDate: string;
  media_type: string;
  ratings: string;
  title: string;
};

const ItemCard: FC<ItemCardProps> = ({
  id,
  imgSrc,
  releaseDate,
  media_type,
  ratings,
  title,
}) => {
  const imageSrc = `https://image.tmdb.org/t/p/w533_and_h300_bestv2/${imgSrc}`;
  const nullImageSrc = "https://image.tmdb.org/t/p/original/null";

  return (
    <li>
      <div className="relative w-full">
        <BookMark
          id={id}
          media_type={media_type}
          className="absolute right-3 top-3 z-10"
        />
        <NavLink
          to={media_type === "movie" ? `/movie/${id}` : `/tv/${id}`}
          key={id}
        >
          <img
            className="w-full rounded-lg"
            loading="lazy"
            decoding="async"
            max-width="500px"
            src={
              imageSrc === nullImageSrc
                ? "assets/images/default-poster.png"
                : imageSrc
            }
            alt={`${title} poster`}
          />
        </NavLink>
      </div>
      <div className="mt-2">
        <div className="flex gap-2">
          <Text>{releaseDate}</Text>
          <span>•</span>
          <div className="flex items-center gap-1">
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
        <Heading as="h3" size="sm">
          {title}
        </Heading>
      </div>
    </li>
  );
};
export default ItemCard;
