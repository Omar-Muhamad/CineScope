import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageLayout from "@/components/layout/PageLayout";
import ItemCard from "@/components/ui/ItemCard";
import GridLayout from "@/components/layout/GridLayout";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTv, tvPagination } from "@/redux/tv/tvSlice";
import Heading from "@/components/ui/Heading";
import Loading from "@/components/ui/Loading";
import ReactPaginate from "react-paginate";

const Tv: FC = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const data = useSelector((state: RootState) => state.tv);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, tv } = data;
  const { page, total_pages, results } = tv;

  const endOffset = itemOffset + 20;
  const currentItems = results.slice(itemOffset, endOffset);
  const pageCount = total_pages > 100 ? 100 : total_pages;

  const handlePageClick = async (event: { selected: number }) => {
    const newOffset = (event.selected * 20) % results.length;
    await dispatch(tvPagination({ currentPage: event.selected + 1 }));
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(fetchTv());
  }, [dispatch]);

  return (
    <PageLayout>
      <Heading as="h1" className="mt-6">Popular TV Shows</Heading>
      {loading && <Loading />}
      <GridLayout>
        {!loading && currentItems && currentItems.length !== 0
          ? currentItems.map((tvShow) => (
              <ItemCard
                key={tvShow.id}
                id={tvShow.id}
                imgSrc={tvShow.backdrop_path}
                releaseDate={tvShow.first_air_date?.substring(0, 4)}
                media_type="tv"
                ratings={tvShow.adult ? "18+" : "PG"}
                title={tvShow.name}
              />
            ))
          : null}
      </GridLayout>
      <div className="pr-6 md:pr-0">
        <ReactPaginate
          nextAriaLabel="next"
          previousAriaLabel="previous"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          marginPagesDisplayed={1}
          forcePage={page - 1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          className="mt-8 bg-secondary-dark w-full md:w-fit mx-auto p-2 md:p-4 rounded-lg flex items-center justify-center gap-2 md:gap-5 text-lg text-white font-outfitMedium"
          pageClassName="px-2 rounded-md"
          activeClassName="px-2 md:px-3 py-[3px] bg-orange rounded-full"
          activeLinkClassName="md:w-3 md:h-3 bg-orange"
          previousClassName="px-2 md:px-4 py-1 bg-orange rounded-md cursor-pointer hover:bg-white hover:text-orange"
          nextClassName="px-2 md:px-4 py-1 bg-orange rounded-md cursor-pointer hover:bg-white hover:text-orange"
        />
      </div>
    </PageLayout>
  );
};

export default Tv;
