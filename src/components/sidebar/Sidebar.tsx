import React from "react";
import { catergories, catergory } from "../../types/type";

const Sidebar: React.FC = () => {
  return (
    <ul>
      {catergories.map((cat: catergory, i) => (
        <li key={i}>{cat}</li>
      ))}
    </ul>
  );
};

export default Sidebar;
