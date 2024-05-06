import { ChangeEvent, FC, KeyboardEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBox: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams("");

  const handleSearch = (
    event: KeyboardEvent<HTMLInputElement> & ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (event.key === "Enter") {
      const newSearchParams: Record<string, string> = {};
      newSearchParams["search"] = inputValue;
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  useEffect(() => {}, [searchParams]);

  return (
    <div className="w-full flex gap-6 items-start mt-5 pr-6 ">
      <div className="w-9 h-9 md:w-10 md:h-10">
        <img
          className="w-full h-full"
          src="/src/assets/icons/icon-nav-search.svg"
          alt="Search icon"
        />
      </div>
      <input
        className="w-full bg-transparent py-3 -mt-2 text-xl outline-none focus:border-b-2 caret-orange"
        type="text"
        placeholder="Search for movies and TV series..."
        onKeyDown={handleSearch}
        required
      />
    </div>
  );
};
export default SearchBox;
