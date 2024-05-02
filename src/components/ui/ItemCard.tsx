import { FC } from "react";

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
  return (
    <li>
      <div className="item-image w-full">
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/original/${imgSrc}`}
          alt={`${title} poster`}
        />
      </div>
      <div className="item-description">
        <div className="">
          <p className="realse-date">{releaseDate}</p>
          <span>•</span>
          <div className="media-type">
            <img
              src={`/src/assets/icons/icon-category-${mediaType}.svg`}
              alt={`${mediaType} icon`}
            />
            <p>{mediaType}</p>
          </div>
          <span>•</span>
          <p className="ratings">{ratings}</p>
        </div>
        <h3>{title}</h3>
      </div>
    </li>
  );
};
export default ItemCard;
