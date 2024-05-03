import { FC } from "react";
import Heading from "./Heading";
import Text from "./Text";

type ItemCardProps = {
  imgSrc: string | undefined;
  releaseDate: string | undefined;
  mediaType: string | undefined;
  ratings: string | undefined;
  title: string | undefined;
};

const ItemCard: FC<ItemCardProps> = ({
  imgSrc,
  releaseDate,
  mediaType,
  ratings,
  title,
}) => {
  const imageSrc =
    imgSrc === null ? null : `https://image.tmdb.org/t/p/original/${imgSrc}`;
  return (
    <li>
      <div className="item-image w-full">
        <img
          className="w-full rounded-lg"
          src={imageSrc || "/src/assets/images/default-poster.png"}
          alt={`${title} poster`}
        />
      </div>
      <div className="mt-2">
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
        <Heading as="h3" size="sm">
          {title}
        </Heading>
      </div>
    </li>
  );
};
export default ItemCard;
