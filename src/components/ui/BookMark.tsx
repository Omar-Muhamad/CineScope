import { HiOutlineBookmark } from "react-icons/hi2";
const BookMark = () => {
  return (
    <div className="group w-10 h-10 rounded-full bg-[#00000050] hover:bg-white hover:opacity-100 flex justify-center items-center">
      <HiOutlineBookmark className="text-2xl text-white group-hover:text-black" />
    </div>
  )
}
export default BookMark