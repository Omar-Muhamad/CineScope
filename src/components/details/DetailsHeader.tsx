import { FC } from "react";
import Text from "../ui/Text";
import Heading from "../ui/Heading";

type DetailsHeaderProps = {
  title: string;
  rating: number;
  releaseDate: string;
  mediaType: string;
  imageSrc: string;
  posterUrl: string;
};

const DetailsHeader: FC<DetailsHeaderProps> = ({
  posterUrl,
  title,
  rating,
  releaseDate,
  mediaType,
  imageSrc,
}) => {
  return (
    <section className="relative w-full h-[25vh] md:h-[60vh]">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${imageSrc})`,
        }}
        className="w-full h-full z-0 bg-black opacity-20 md:rounded-bl-2xl bg-cover bg-center md:bg-top bg-no-repeat"
      ></div>
      <div className="absolute w-full backdrop-blur-[1.5px] z-10 top-0 p-5 h-full flex gap-6">
        <div className="h-full hidden md:block">
          <img
            className="h-full rounded-xl"
            src={`https://image.tmdb.org/t/p/original/${posterUrl}`}
            alt={`${title} poster`}
          />
        </div>
        <div className="h-full grow">
          <Heading as='h1'>{title}</Head>
          <div className="">
            <span>⭐️</span>
            <span>{rating}/10</span>
          </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};
export default DetailsHeader;
