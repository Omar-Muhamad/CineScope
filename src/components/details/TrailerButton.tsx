import Button from "../ui/Button";
import { IoPlayCircleOutline } from "react-icons/io5";

const TrailerButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button rounded="full" className="flex items-center pr-3" onClick={onClick}>
      <IoPlayCircleOutline className="text-3xl mr-1" />
      Trailer
    </Button>
  );
};
export default TrailerButton;
