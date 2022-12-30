import React from "react";
import { Link } from "react-router-dom";
import { catergories, catergory } from "../../types/type";
import { categoryConvertor } from "../../utility/helper";

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
      <li>
        <h3>Categories</h3>
      </li>
      <hr />
      <li>
        <Link to="posts/latest">Latest Posts</Link>
      </li>
      {catergories.map((cat: catergory, i) => (
        <li key={i}>
          <Link to={`posts?cat=${categoryConvertor(cat)}`} key={i}>
            {cat}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
