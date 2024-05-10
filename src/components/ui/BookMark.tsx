import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

import { addBookmark, removeBookmark } from "@/redux/bookmarked/bookmarkSlice";
import { AppDispatch } from "@/redux/store";
import { useLocation, useNavigate } from "react-router-dom";

type BookMarkProps = {
  id: number;
  media_type: string;
  className?: string;
};

const BookMark: FC<BookMarkProps> = ({ id, media_type, className }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {pathname} = useLocation()
  const navigate = useNavigate();

  const session_id = localStorage.getItem("session_id");

  const checkBookmarked = async ({ id }: { id: number }) => {
    const params = {
      api_key: import.meta.env.VITE_APP_API_KEY,
    };
    const response = await axios.get(
      `https://api.themoviedb.org/3/list/8299412/item_status`,
      {
        params: {
          ...params,
          movie_id: id,
        },
      }
    );
    return response.data.item_present;
  };

  const handleClick = async () => {
    const session_id = localStorage.getItem("session_id");
    if (isBookmarked) {
      await dispatch(removeBookmark({ id, media_type, session_id })).then(() => {
        if (pathname === "/bookmarked") {
          navigate(0)
        }
      });
      setIsBookmarked(false);
    } else {
      await dispatch(addBookmark({ id, media_type, session_id }))
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    if (isBookmarked === false && session_id) {
      checkBookmarked({ id }).then((res) => setIsBookmarked(res));
    }
  }, [isBookmarked, id, session_id]);

  return (
    <div
      onClick={handleClick}
      className={`group rounded-full bg-[#00000070] hover:bg-white hover:opacity-100 flex justify-center items-center cursor-pointer ${className}`}
    >
      {isBookmarked ? (
        <IoBookmark className="text-xl text-white group-hover:text-black" />
      ) : (
        <IoBookmarkOutline className="text-xl text-white group-hover:text-black" />
      )}
    </div>
  );
};
export default BookMark;
