import { addBookmark, removeBookmark } from "@/redux/bookmarked/bookmarkSlice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi2";
import { useDispatch } from "react-redux";

const BookMark = ({ id, media_type }: { id: number; media_type: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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

  const handleClick = () => {
    const session_id = localStorage.getItem("session_id");
    if (isBookmarked) {
      dispatch(removeBookmark({ id, media_type, session_id }));
      setIsBookmarked(false);
    } else {
      dispatch(addBookmark({ id, media_type, session_id }));
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    if (isBookmarked === false) {
      checkBookmarked({ id }).then((res) => setIsBookmarked(res));
    }
  }, [isBookmarked, id]);

  return (
    <button
      onClick={handleClick}
      className="group w-10 h-10 rounded-full bg-[#00000050] hover:bg-white hover:opacity-100 flex justify-center items-center"
    >
      {isBookmarked ? (
        <HiBookmark className="text-2xl text-white group-hover:text-black" />
      ) : (
        <HiOutlineBookmark className="text-2xl text-white group-hover:text-black" />
      )}
    </button>
  );
};
export default BookMark;
