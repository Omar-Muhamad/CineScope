import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchDetails } from "../redux/details/detailsSlice";
import { ItemData } from "@/types";
import { NavLink, useParams } from "react-router-dom";

const Details: FC = () => {
  const data = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch<AppDispatch>();
  const { mediaType, id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails({ mediaType, id }));
  }, []);

  return (
    <>
      <h1 className="text-xl">Popular details</h1>
      {data.loading && <p>Loading...</p>}
      {!data.loading && data.error ? <p>error</p> : null}

      {!data.loading && data.details ? (
        mediaType === "movie" ? (
          <p>{data.details.title}</p>
        ) : (
          <p>{data.details.name}</p>
        )
      ) : null}
    </>
  );
};

export default Details;
