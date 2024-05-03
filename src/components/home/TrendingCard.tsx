import { FC } from "react";
import Text from "../ui/Text";
import Heading from "../ui/Heading";

type TrendingCardProps = {
  imgSrc: string | undefined;
  releaseDate: string | undefined;
  mediaType: string | undefined;
  ratings: string | undefined;
  title: string | undefined;
};

const TrendingCard: FC<TrendingCardProps> = ({
  imgSrc,
  releaseDate,
  mediaType,
  ratings,
  title,
}) => {
  return (
    <li>
      <div className="item-image w-[60vw] md:w-[30vw]">
        <img
          className="w-full rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${imgSrc}`}
          alt={`${title} poster`}
        />
      </div>
      <div className="item-description">
        <div className="flex gap-2">
          <Text>{releaseDate}</Text>
          <span>•</span>
          <div className="media-type flex items-center gap-1">
            <img
              className="w-3 h-3"
              src={`/src/assets/icons/icon-category-${mediaType}.svg`}
              alt={`${mediaType} icon`}
            />
            <Text>{mediaType}</Text>
          </div>
          <span>•</span>
          <Text>{ratings}</Text>
        </div>
        <Heading as="h3" size="sm">{title}</Heading>
      </div>
    </li>
  );
};
export default TrendingCard;
