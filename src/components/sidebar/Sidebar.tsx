import React from "react";
import { Link } from "react-router-dom";
import { catergories, catergory } from "../../types/type";

interface Props {
  jwtToken: string;
  setJwtToken: (token: string) => void;
}

const Sidebar: React.FC<Props> = ({ jwtToken, setJwtToken }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {jwtToken ? (
        <li>
          <Link to="/login" onClick={() => setJwtToken("")}>
            Sign Out
          </Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      )}

      <hr />
      {catergories.map((cat: catergory, i) => (
        <li key={i}>{cat}</li>
      ))}
    </ul>
  );
};

export default Sidebar;
