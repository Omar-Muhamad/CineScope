import { FC, useState } from "react";
import movieTrailer from "movie-trailer";
import { IoCloseCircleOutline } from "react-icons/io5";

import Text from "../ui/Text";
import Heading from "../ui/Heading";
import PercentageCircle from "../ui/PercentageCircle";
import BookMark from "../ui/BookMark";
import TrailerButton from "./TrailerButton";

type DetailsHeaderProps = {
  id: number;
  title: string;
  rating: number;
  releaseDate: string;
  mediaType: string;
  imageSrc: string;
  genres: {
    id: number;
    name: string;
  }[];
  posterUrl: string;
  overview: string;
};

const DetailsHeader: FC<DetailsHeaderProps> = ({
  id,
  posterUrl,
  title,
  rating,
  releaseDate,
  mediaType,
  genres,
  imageSrc,
  overview,
}) => {
  const [trailerUrl, setTrailerUrl] = useState<null | string>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handlePlayTrailer = async () => {
    try {
      const url = await movieTrailer(title || "");
      console.log(url);
      if (url !== null && url !== "") {
        const embedUrl = `https://youtube.com/embed/${url.split("v=")[1]}`;
        setTrailerUrl(embedUrl);
      }
      setIsModalOpened(true);
    } catch {
      setTrailerUrl(null);
    }
  };

  const handleCloseBtn = () => {
    setIsModalOpened(false);
    setTrailerUrl(null);
  };

  return (
    <>
      <section className="relative w-full h-[25vh] md:h-[50vh]">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${imageSrc})`,
          }}
          className="w-full h-full z-0 bg-black opacity-20 md:rounded-bl-2xl bg-cover bg-center md:bg-top bg-no-repeat"
        ></div>

        <div className="absolute w-full backdrop-blur-[1.5px] z-10 top-0 px-5 md:py-5  h-full flex gap-6">
          <div className="h-full hidden md:block">
            <img
              className="h-full rounded-xl"
              src={`https://image.tmdb.org/t/p/original/${posterUrl}`}
              alt={`${title} poster`}
            />
          </div>

          <div className="h-full -mt-5 md:mt-0 grow">
            <Heading as="h1">{title}</Heading>

            <div className="flex gap-2">
              {genres?.slice(0, 3).map((genre, i) => (
                <Text key={genre.id}>
                  {genre.name}
                  {i === genres?.slice(0, 3).length - 1 ? "" : ","}
                </Text>
              ))}
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

            <div className="mt-2 flex gap-2">
              <PercentageCircle rating={rating * 10} />
              <BookMark id={id} media_type={mediaType}/>
              <TrailerButton onClick={handlePlayTrailer} />
            </div>

            <div className="hidden md:block mt-2 max-w-[50vw]">
              <Heading as="h3" size="sm">
                Overview:
              </Heading>
              <Text size="sm" className="text-[#c3c4c7]">
                {overview?.length > 300 ? overview?.split(".")[0] : overview}
              </Text>
            </div>
          </div>
        </div>
      </section>
      {trailerUrl === null ? (
        isModalOpened && (
          <Heading as="h1" className="text-center">
            Sorry, no trailer found
          </Heading>
        )
      ) : (
        <div className="absolute z-20 top-0 bottom-0 left-0 right-0 bg-[#00000080] backdrop-blur-[2px] flex justify-center items-center">
          <div className="relative w-[375px] h-[220px] md:w-[640px] md:h-[360px] lg:w-[854px] lg:h-[480px]">
            <button
              className="absolute text-4xl -right-10 -top-10 hover:text-red-500 z-30"
              onClick={handleCloseBtn}
            >
              <IoCloseCircleOutline />
            </button>
            <iframe
              className="w-full h-full"
              src={trailerUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};
export default DetailsHeader;
