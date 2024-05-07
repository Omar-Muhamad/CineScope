import { FC, useState } from "react";
import movieTrailer from "movie-trailer";
import { IoCloseCircleOutline } from "react-icons/io5";

import Text from "../ui/Text";
import Heading from "../ui/Heading";
import PercentageCircle from "../ui/PercentageCircle";
import BookMark from "../ui/BookMark";
import TrailerButton from "./TrailerButton";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { RiFilmFill } from "react-icons/ri";

type DetailsHeaderProps = {
  id: number;
  title: string;
  rating: number;
  release_date: string;
  media_type: string;
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
  release_date,
  media_type,
  genres,
  imageSrc,
  overview,
}) => {
  const [trailerUrl, setTrailerUrl] = useState<null | string>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handlePlayTrailer = async () => {
    try {
      const url = await movieTrailer(title || "top 10 movies 2024");
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
      <section className="relative w-full h-[25vh] md:h-[450px]">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${imageSrc})`,
          }}
          className="w-full h-full z-0 bg-black opacity-20 md:rounded-bl-2xl bg-cover bg-center md:bg-top bg-no-repeat"
        ></div>

        <div className="absolute w-full backdrop-blur-[1.5px] z-10 top-0 px-5 md:py-5  h-full flex gap-6">
          <div className="h-full hidden md:block">
            <img
              className="h-full rounded-xl"
              src={`https://image.tmdb.org/t/p/w300/${posterUrl}`}
              alt={`${title} poster`}
            />
          </div>

          <div className="h-full md:mt-5 grow">
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
              <Text>{release_date}</Text>
              <span>•</span>
              <div className="media-type flex items-center gap-1">
                {media_type === "movie" ? (
                  <RiFilmFill className="text-md" />
                ) : (
                  <PiTelevisionSimpleFill className="text-md" />
                )}
                <Text>{media_type}</Text>
              </div>
            </div>

            <div className="mt-2 flex gap-2">
              <PercentageCircle rating={rating * 10} />
              <BookMark id={id} media_type={media_type} />
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
          <div className="absolute z-50 inset-0 max-h-screen bg-[#00000080] backdrop-blur-[2px] flex justify-center items-center">
            <button
              className="absolute text-5xl right-10 top-10 hover:text-red-500 z-30"
              onClick={handleCloseBtn}
            >
              <IoCloseCircleOutline />
            </button>
            <Heading as="h1" className="text-center">
              Sorry, no trailer found
            </Heading>
          </div>
        )
      ) : (
        <div className="absolute z-50 inset-0 max-h-screen bg-[#00000080] backdrop-blur-[2px] flex justify-center items-center">
          <div className="relative w-[320px] h-[200px] md:w-[640px] md:h-[360px] lg:w-[854px] lg:h-[480px]">
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
