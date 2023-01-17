import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/Outline";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({
  handleClick,
  searchValue,
  setSearchValue,
}) => {
  return (
    <form
      id="top"
      className="flex flex-row justify-between items-center bg-slate-200 py-2 px-4 rounded-full shadow-md hover:shadow-lg w-[70%] max-w-[500px] min-w-[270px] h-fit gap-2 lg:scroll-m-6 scroll-m-[8rem] transition"
    >
      <input
        type="text"
        placeholder="Search by title or author"
        className="rounded-md font-semibold flex-grow px-3 text-slate-600 bg-transparent font-Raleway tracking-wide"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleClick}>
        <MagnifyingGlassIcon className="h-6 w-6 text-slate-700" />
      </button>
    </form>
  );
};

export default SearchBar;
