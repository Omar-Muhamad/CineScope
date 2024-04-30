
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { decrement, increment } from "../redux/counter/counterSlice";
import Button from "../components/ui/Button";

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="text-xl">Home</h1>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
        <Button>Add me</Button>
      </div>
    </>
  );
};
export default Home;
