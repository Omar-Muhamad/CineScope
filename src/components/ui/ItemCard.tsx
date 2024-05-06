import { FC } from "react";
import { NavLink } from "react-router-dom";

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
  const imageSrc = `https://image.tmdb.org/t/p/original/${imgSrc}`;
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
                ? "/src/assets/images/default-poster.png"
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
            <img
              className="w-3 h-3"
              src={`/src/assets/icons/icon-category-${media_type}.svg`}
              alt={`${media_type} icon`}
            />
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
