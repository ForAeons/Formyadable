import React, { useEffect, useState } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import PostFC from "./PostFC";
import { Post } from "../../../types/type";
import { BACKEND_URL } from "../../../utility/helper";
import "../../../App.css";

interface OutletContext {
  jwtToken: string;
  setAlertMessage: (errMsg: string) => void;
  setDisplay: (display: boolean) => void;
}

const Home: React.FC = () => {
  const { jwtToken, setAlertMessage, setDisplay } =
    useOutletContext() as OutletContext;

  const navigator = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [postArr, setPostArr] = useState<Post[]>([]);

  // title query
  const q = searchParams.get("q") || "";
  // category query
  const cat = searchParams.get("cat") || "";
  // page_number query, defaults to first page
  const pageNum = searchParams.get("page") || "1";

  let URL = BACKEND_URL.concat("posts");

  /////////////////////////////////////

  let query: string = "";
  // do something with the q value
  if (q !== "") {
    query = `q=${q}`;
  } else if (cat !== "") {
    query = `cat=${cat}`; // q and cat are mutually exclusive
  }

  // query is not empty string
  query += `&page=${pageNum}`;

  URL = URL + "?" + query;

  ///////////////////////////////////////////

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigator(`/posts?q=${searchQuery}`);
  };

  ////////////////////////////////////////////

  useEffect(() => {
    if (!jwtToken) return;

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data: Post[] | Error) => {
        if (data instanceof Error) throw new Error(data.message);
        else {
          setPostArr(data);
          console.log(data);
          console.log(URL);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setAlertMessage(err.message);
        setDisplay(true);
      });
  }, [URL, page, jwtToken, setAlertMessage, setDisplay]);
  return (
    <div>
      {!jwtToken ? (
        <h1>Please login</h1>
      ) : (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="search bar">Search Bar</label>
              <input
                type="text"
                placeholder="Search by Title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input type="submit" />
            </form>
          </div>
          <ul>
            {postArr.map((post) => (
              <li key={post.id}>
                <PostFC post={post} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
