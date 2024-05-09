import { FC } from "react";
import { NavLink } from "react-router-dom";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import poster from "@/assets/images/default-poster.png";

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
  const nullImageSrc = "https://image.tmdb.org/t/p/w533_and_h300_bestv2/null";

  return (
    <li>
      <NavLink to={media_type === "movie" ? `/movie/${id}` : `/tv/${id}`}>
        <div className="relative w-full">
          <BookMark
            id={id}
            media_type={media_type}
            className="absolute peer right-3 top-3 z-10"
          />
          <div className="absolute inset-0 opacity-0 hover:opacity-100 peer-hover:opacity-100  bg-[#00000070] backdrop-blur-[2px] flex justify-center items-center">
            <Text size="sm" className="bg-[#00000080] py-2 px-3 rounded-full">
              See Details
            </Text>
          </div>
          <img
            className="w-full rounded-lg aspect-[16/9] object-cover"
            loading="lazy"
            decoding="async"
            max-width="500px"
            src={imageSrc === nullImageSrc ? poster : imageSrc}
            alt={`${title} poster`}
          />
        </div>
      </NavLink>
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
        <NavLink to={media_type === "movie" ? `/movie/${id}` : `/tv/${id}`}>
          <Heading as="h3" size="sm">
            {title}
          </Heading>
        </NavLink>
      </div>
    </li>
  );
};
export default ItemCard;
