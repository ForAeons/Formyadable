import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/Outline";

const SearchBar: React.FC = () => {
  return (
    <form
      id="top"
      className="flex flex-row justify-between content-center bg-slate-200 py-2 px-4 rounded-full shadow-md hover:shadow-lg w-[70%] max-w-[500px] min-w-[270px] sm:mt-6 gap-2 sm:scroll-m-6 scroll-m-[8rem]"
    >
      <input
        type="text"
        placeholder="What's on your mind?"
        className="rounded-md font-semibold flex-grow px-3 text-slate-600 bg-transparent font-Raleway tracking-wide"
      />
      <button>
        <MagnifyingGlassIcon className="h-6 w-6 text-slate-700" />
      </button>
    </form>
  );
};

export default SearchBar;
