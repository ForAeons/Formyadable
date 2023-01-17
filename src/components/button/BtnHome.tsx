import React from "react";
import { useNavigate } from "react-router-dom";

const BtnHome: React.FC = () => {
  const navigator = useNavigate();
  return (
    <button
      className="rounded-md bg-teal-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-teal-300 transition"
      onClick={() => navigator("/")}
    >
      Home
    </button>
  );
};

export default BtnHome;
