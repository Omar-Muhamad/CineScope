import { FC } from "react";
import { NavLink } from "react-router-dom";

import Text from "../ui/Text";
import BookMark from "../ui/BookMark";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevisionSimpleFill } from "react-icons/pi";

type TrendingCardProps = {
  id: number;
  imgSrc: string;
  releaseDate: string;
  media_type: string;
  ratings: string;
  title: string;
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
    <li>
      <NavLink className="relative" to={movie ? `/movie/${id}` : `/tv/${id}`}>
        <BookMark
          id={id}
          media_type={media_type}
          className="absolute z-20 peer right-4 top-4"
        />

        <div className="relative item-image w-[60vw] md:w-[30vw]">
          <img
            className="w-full rounded-lg"
            loading="eager"
            src={`https://image.tmdb.org/t/p/w1280/${imgSrc}`}
            alt={`${title} poster`}
          />
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
          <h2 className="font-outfitMedium text-2xl">{title}</h2>
        </div>

        <div className="absolute inset-0 opacity-0 hover:opacity-100 peer-hover:opacity-100 bg-[#00000070] backdrop-blur-[2px] flex justify-center items-center">
          <Text className="bg-[#00000080] py-3 px-5 rounded-full">
            See Details
          </Text>
        </div>
      </NavLink>
    </li>
  );
};
export default TrendingCard;
