import { FC } from "react";
import ReactPaginate from "react-paginate";

type ReactPaginationProps = {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
  page: number;
};

const ReactPagination: FC<ReactPaginationProps> = ({ pageCount, handlePageClick, page }) => {
  return (
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
  );
};
export default ReactPagination;
